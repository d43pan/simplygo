<?php


$config = include('config.php');
$heading = $config['heading'] ?? 'SimplyGo';

include 'Database.php';
$db = new Database();

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

echo "<h1 style='text-align:center'>$heading</h1>";

// Show form to enter a new URL

if ($parts[0] == "" && $parts[1] == ""){
    echo "<div style='text-align:center'>";
    echo "Simply go to the url you want to use and I'll prompt you.";
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
echo "</table>";


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