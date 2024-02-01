<?php


$config = include('config.php');
$heading = $config['heading'] ?? 'SimplyGo';

$words = [
    'breakfast', 'work', 'lunch', 'dinner', 'exercise', 'sleep', 'commute', 'shopping', 'news', 
    'email', 'social', 'entertainment', 'finance', 'education', 'health', 'travel', 'sports', 
    'music', 'movies', 'games', 'blog', 'forum', 'search', 'video', 'wiki', 'weather', 'maps', 
    'banking', 'shopping', 'dating', 'job', 'real-estate', 'food-delivery', 'streaming'
];
$randomWord = $words[array_rand($words)];

include 'Database.php';
$db = new Database();


$message = '';

// Check if a file was uploaded
if (!empty($_FILES['csv'])) {
    $uploadedFile = $_FILES['csv'];
    // Check if the file upload was successful
    if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
        // Open the file
        $csvData = file_get_contents($uploadedFile['tmp_name']);

        // Parse the CSV data
        $data = array_map("str_getcsv", explode("\n", $csvData));

        // Remove the header row
        array_shift($data);

        // Update the database
        foreach ($data as $row) {

            // Skip if the row is empty or only contains whitespace characters
            if (empty($row) || (count($row) == 1 && trim($row[0]) == '')) {
                continue;
            }

            // Check if the row has the correct number of columns
            if ( count($row) != 2) {
                $message .= "\nEach row should only have 2 columns.";
                continue;
            }

            list($path, $url) = $row;

            // Add the new redirect to the database
            try {
                if ($db->createRedirect($path, $url)) {
                    $message .= "Redirect for $path created successfully.<br>";
                } else {
                    $message .= "Failed to create redirect for $path.<br>";
                }
            } catch (Exception $e) {
                $message .= "Error creating redirect for $path: " . $e->getMessage() . "<br>";
            }
        }
    } else {
        $message = 'File upload failed with error code ' . $uploadedFile['error'];
    }
}


$uri = $_SERVER['REQUEST_URI'];
$parts = explode('/', $uri);
$path = $parts[1] ?? '';

$delete = $parts[2] ?? '';
$is_delete = $delete == 'delete' ? true : false;


$is_path_valid = strlen(trim($path)) > 0;

$parsedUri = parse_url($uri);

// Check if the path is valid and a URL is posted
if ( $is_path_valid && isset($_POST['url'])) {
    
    $url = $_POST['url'];
    $parsedUrl = parse_url($url);


    // Check if the URL has a scheme (like http:// or https://)
    if (!isset($parsedUrl['scheme'])) {
        // If the URL doesn't have a scheme, prepend 'http://' to it
        $url = 'http://' . $url;
    }

    $result = $db->createRedirect($path, $url);
    if ($result) {
        header("Location: " . "/" );
        exit;
    } else {
        echo "Failed to insert into database";
    }
}

// Add download route
if ($path == 'download') {
    // Fetch data from database
    $data = $db->getAllRedirects();

    // Open output buffer
    ob_start();

    // Open output stream
    $stream = fopen('php://output', 'w');

    // Add CSV headers
    fputcsv($stream, array_keys(reset($data)));

    // Add CSV data
    foreach ($data as $row) {
        fputcsv($stream, $row);
    }

    // Close output stream
    fclose($stream);

    // Get CSV data from output buffer
    $csv = ob_get_clean();

    // Set headers to force download of CSV file
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="redirects.csv"');

    // Output CSV data
    echo $csv;

    // Stop script execution
    exit;
}

// check if the path is valid. Assuming that there's not url in the post
// meaning we'll try to redirect or let the user create a new redirect or delete (if that was in the path)
if ($is_path_valid) {

    if ($is_delete) {
        if( $db->deleteRedirect($path) ) {
            header("Location: " . "/" );
            exit;
        } else {
            echo "Failed to delete from database";
        }
        header("Location: " . "/" );
        exit;
    }


    $redirect = $db->getRedirect($path);
    
    if ($redirect) {
        $redirectId = $redirect['id'];
        $url = $redirect['url'];
        $parsedUrl = parse_url($url);
        
        if (!isset($parsedUrl['scheme'])) {
            $url = 'http://' . $url;
        }
        $db->logVisit($redirectId);
        header("Location: " . $url);
        exit;
    }


}

echo "<h1 style='text-align:center'><a href='/'>$heading</a></h1>";

// Show form to enter a new URL

if ($parts[0] == "" && $parts[1] == ""){
    echo "<div style='text-align:center'>";
    echo "Simply go to the url you want to use and I'll prompt you.";
    echo "For example: <a href='/$randomWord'>/$randomWord</a>";
    echo "</div>";
}else{
    echo "<div style='text-align:center'>";
    echo "<form method='POST' action=''>";
    echo "<input type='text' name='url' placeholder='Where should this go?'>";
    echo "<input type='submit' value='Create'>";
    echo "</form>";
    echo "</div>";
}

// show list of most recent redirects
$redirects = $db->getRecentRedirects();

echo "<h3 style='text-align:center'>Recent Redirects</h3>";
echo "<table style='margin-left:auto;margin-right:auto'>";
echo "<tr><th>Path</th><th>URL</th><th>Created</th><th>Visits</th></tr>";
foreach ($redirects as $redirect) {
    $path = $redirect['path'];
    $url = $redirect['url'];
    $created =  date("m-d-Y", strtotime($redirect['created']));
    $visitCount = $redirect['visit_count'];
    echo "<tr><td><a href='/$path'> $path</a></td><td>$url</td><td>$created</td><td>$visitCount</td></tr>";
}
echo "<tr><td></td><td></td><td></td><td></td></tr>";
echo "<tr><td><a href='/download'> Download All Redirects</a></td><td></td><td></td><td></td></tr>";
echo '<tr><td></td><td></td><td></td><td><form action="/" method="post" enctype="multipart/form-data"><input type="file" name="csv"><input type="submit" value="Upload CSV"></form></td></tr>';
echo "</table>";

echo $message;

/* some debugging stuff
echo "<pre>POST: ";
var_dump($_POST);
echo "</pre>";

echo "<pre>GET: ";
var_dump($_GET);
echo "</pre>";

echo "<pre>parsedUri: ";
var_dump($parsedUri);
echo "</pre>";

echo "<pre>parts: ";
var_dump($parts);
echo "</pre>";

echo "<pre>path: ";
var_dump($path);
echo "</pre>";
*/