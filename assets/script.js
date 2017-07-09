(function() {

    var word, answer, json_words;
    var speech_types = [];
    var dom_word = document.getElementById('word');
    var dom_result = document.getElementById('result');
    var dom_speech = document.getElementById('speech');

    var request = new XMLHttpRequest();
    request.open('GET', '../data/data.json', true);
    request.onload = function() {
        if (this.readyState === 4 && 
            this.status === 200) {
                save_data(this.response);
                generate();
        }
    };
    request.send();
    request = null;

    function save_data(input) {
        json_words = JSON.parse(input)['0'];
        for (var i in json_words) {
            speech_types.push(i);
        };
    };

    function generate() {
        speech_type = speech_types[0|Math.random() * speech_types.length];
        var words = json_words[speech_type];
        var size = Object.keys(words).length - 1;
        var current = 0|Math.random() * (size - 0);
        word = Object.keys(words)[current];
        answer = words[word];

        update_dom();
    };

    function update_dom() {
        dom_word.innerHTML = word;
        dom_result.innerHTML = '&mdash; ' + answer;
        dom_speech.innerHTML = speech_type;
    };

    document.onkeydown = function(e) {
        (e.keyCode == 32) && generate();
    };

})();
