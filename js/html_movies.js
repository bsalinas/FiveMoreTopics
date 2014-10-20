$(document).ready(function(){
  var movies = {}
  var delays = {}
  // Create simple UI to interact with movie
  $('.code').each(function(){
    var id = $(this).attr('data-id')
    var movie = CodeMirror.movie('code_'+id);
    movies[id] = movie;
    var thisUpdatePreview = function(){
        var previewFrame = document.getElementById('preview_'+id);
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        preview.write(movies[id]._editor.getValue());
        preview.close();
      }
    movie._editor.on("change", function() {
      clearTimeout(delays[id]);
      delays[id] = setTimeout(thisUpdatePreview, 300);
    });
    delays[id] = setTimeout(thisUpdatePreview,300)
    
  })
  $('a.btn.playBtn').click(function(e){
    e.preventDefault();
    var movie = movies[$(this).attr('data-id')];
    console.log(movie)
    var btn = $(this);
    if (movie.state() == 'play') {
      movie.pause();
      btn.text('Play');
    } else {
      movie.play();
      btn.text('Pause');
    }
    movie.on('stop', function(name) {
      btn.text('Play')
    });
    
  });
});