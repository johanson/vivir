(function() {

    const shuffle_array = (arr) => arr.sort(() => (Math.random() - 0.5));

    var word, answer, speech_type, data;
    var dom_word = document.getElementById('word');
    var dom_result = document.getElementById('result');
    var dom_speech = document.getElementById('speech');
    var wrapper = document.getElementById('wrp');
    var tts = document.getElementById("tts");

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
        data = JSON.parse(input)['0'];
    };

    function generate() {

        var temp_array = []
        for (var i in data) {
            var parent = i;
            for (word in data[i]) {
                temp_array.push([parent, word, data[i][word]]);
            };
        };

        var result = (shuffle_array(temp_array)[0]);
        speech_type = result[0];
        word        = result[1];
        answer      = result[2];

        update_dom();
    };

    function update_dom() {
        wrapper.classList.remove('blur');
        setTimeout(function(){ 
            wrapper.classList.add('blur');
            dom_word.innerHTML = word;
            dom_result.innerHTML = '&mdash; ' + answer;
            dom_speech.innerHTML = '[' + speech_type + ']';
        }, 50);
    };

    document.onkeydown = function(e) {
        (e.keyCode == 32) && generate();
    };

    tts.onclick = function() {
        responsiveVoice.speak(word, 'Spanish Female');
    };

})();
