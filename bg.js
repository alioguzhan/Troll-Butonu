$(".info").each(function(){
  var user = $(this).find('.entry-author');
  var parentFooter = $(this).parents('footer');
  var feedBack = parentFooter.find('.feedback');
  var responseArea = $('<span/>');
  responseArea.addClass('response-area');
  var userPage = $(user).attr('href'); // engellenecek yazarin profil URLsi

  // Troll Butonu
  var trollButton = $('<a/>');
  trollButton.attr('title', 'Troll');
  trollButton.attr('href', '');
  trollButton.html('Troll');
  trollButton.attr('style', 'font-weight:bold;');
  var li = $('<li/>');
  li.append(trollButton);
  $(this).find('.dropdown-menu').append(li);

  /*
  Engellenecek yazarin sayfasini arkaplanda ac, 
  parse et, 
  engelleme linkini git ara bul getir,
   */
  $.get(userPage, function(resp){
    var html = $.parseHTML(resp);
    var blockLink = $(html).find('#blocked-link').attr('data-add-url');
    trollButton.attr('data-url', blockLink);
    trollButton.on('click', function(){
      var $this = $(this);
      if ($this.attr('data-url') === '#'){
        $this.remove();
        return false;
      }

      $.post($(this).attr('data-url')); // engelleme requestini gonder.
      $this.remove();
      responseArea.html('<strong style="color:red;">Kullanici Engellendi</strong>');
      feedBack.append(responseArea);
      window.setTimeout(function(){
        $(responseArea).remove();
      }, 3000);
      return false;
    });
  });
});
