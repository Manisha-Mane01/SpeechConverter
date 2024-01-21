    let selectedMode = '';
    let recognition;

    function selectMode(mode) {
        selectedMode = mode;
        document.getElementById('inputContainer').style.display = (mode === 'speechToText') ? 'none' : 'block';
        document.getElementById('actionBtn').textContent = 'Start';
        document.getElementById('output').innerHTML = '';
        document.getElementById('error').innerHTML = '';
        document.getElementById('textInput').value = '';
        document.getElementById('stopBtn').style.display = (mode === 'speechToText') ? 'inline-block' : 'none';

        if (recognition && mode !== 'speechToText') {
            recognition.stop();
        }
    }

    function performAction() {
        const inputText = document.getElementById('textInput').value.trim();

        if (selectedMode === 'textToSpeech') {
            textToSpeech(inputText);
        } else if (selectedMode === 'speechToText') {
            speechToText();
        } else {
            document.getElementById('error').textContent = 'Please select a mode.';
        }
    }

    function textToSpeech(text) {
        if (text !== '') {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
            document.getElementById('output').innerHTML = `<p><strong>Text-to-Speech Result:</strong> ${text}</p>`;
            document.getElementById('error').textContent = '';
        } else {
            document.getElementById('error').textContent = 'Please enter text to convert to speech.';
        }
    }

    function speechToText() {
        const outputDiv = document.getElementById('output');
        recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            outputDiv.innerHTML = `<p><strong>Speech-to-Text Result:</strong> ${transcript}</p>`;
        };

        recognition.onend = function() {
            document.getElementById('output').innerHTML += '<p><strong>Speech-to-Text Stopped</strong></p>';
        };

        outputDiv.innerHTML = '<p><strong>Listening...</strong></p>';
        recognition.start();
        document.getElementById('error').textContent = '';
    }

    function stopSpeechToText() {
        if (recognition) {
            recognition.stop();
        }
    }