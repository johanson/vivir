function save_options() {
    var dark_theme  = document.getElementById('use_dark_theme').checked;
    chrome.storage.sync.set({
        use_dark_theme: dark_theme,
    }, function() {
        //
    })
}

function restore_options() {
    chrome.storage.sync.get({
        use_dark_theme: false
    }, function(items) {
        document.getElementById('use_dark_theme').checked = items.use_dark_theme;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);