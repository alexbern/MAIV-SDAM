<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>SDAM</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="Schiedam web app">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript,React">
    <meta name="author" content="Alex Bernard">

    <script type="text/javascript">
      WebFontConfig = {
        custom: { families: ['San Fransisco'],
                  urls: ['<?php echo $basepath;?>/assets/fonts/sf.css'] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>

    <link rel="stylesheet" href="<?php echo $basepath;?>/css/style.css" media="screen" charset="utf-8">
    <link rel="stylesheet" href="<?php echo $basepath;?>/css/rating.min.css" media="screen" charset="utf-8">
  </head>
  <body>
    <div class="react-app">
    </div>
    <script>
      window.app = window.app || {};
      window.app.basename = '<?php echo $basepath;?>';
    </script>
    
    <script src="<?php echo $basepath; ?>/js/script.js"></script>
  </body>
</html>
