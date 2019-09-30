window.setupLanguageFilter = function () {
  var $reset = $('#reset-filter'),
      $id = $('#language_id'),
      $list = $('#project-list'),
      $message = $('#projects-message'),
      defaultMessage = $message.text();

  // Handle resetting the filter to all
  function reset() {
    $.ajax({
      type: 'GET',
      url: '/',
      success: function (htmlData) {
        $list.html($(htmlData).find('div.box.projects'));
      }
    });
    $reset.removeClass('active');
    $message.text(defaultMessage);
    $id.val("");
  }

  // Handle the filter selection changing
  function change() {
    var languageId = $id.val();
    if (languageId === "") return reset(); // Reset if default selected
    var url = '/languages/projects/' + languageId;
    $.ajax({
      type: 'GET',
      url: url,
      success: function (htmlData) {
        $list.html($(htmlData).find('div.box.projects'));
      }
    });
    $message.text('Displaying ' + $id.find("option:selected").text() + ' projects only');
    $reset.addClass('active');
  }

  // Detect the select change event
  $id.change(change);

  // Detect the reset button being clicked
  $reset.click(reset);
};