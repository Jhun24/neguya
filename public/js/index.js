var socket = io('http://localhost:8016');
var langs =
    [['Afrikaans',       ['af-ZA']],
        ['Bahasa Indonesia',['id-ID']],
        ['Bahasa Melayu',   ['ms-MY']],
        ['Català',          ['ca-ES']],
        ['Čeština',         ['cs-CZ']],
        ['Deutsch',         ['de-DE']],
        ['English',         ['en-AU', 'Australia'],
            ['en-CA', 'Canada'],
            ['en-IN', 'India'],
            ['en-NZ', 'New Zealand'],
            ['en-ZA', 'South Africa'],
            ['en-GB', 'United Kingdom'],
            ['en-US', 'United States']],
        ['Español',         ['es-AR', 'Argentina'],
            ['es-BO', 'Bolivia'],
            ['es-CL', 'Chile'],
            ['es-CO', 'Colombia'],
            ['es-CR', 'Costa Rica'],
            ['es-EC', 'Ecuador'],
            ['es-SV', 'El Salvador'],
            ['es-ES', 'España'],
            ['es-US', 'Estados Unidos'],
            ['es-GT', 'Guatemala'],
            ['es-HN', 'Honduras'],
            ['es-MX', 'México'],
            ['es-NI', 'Nicaragua'],
            ['es-PA', 'Panamá'],
            ['es-PY', 'Paraguay'],
            ['es-PE', 'Perú'],
            ['es-PR', 'Puerto Rico'],
            ['es-DO', 'República Dominicana'],
            ['es-UY', 'Uruguay'],
            ['es-VE', 'Venezuela']],
        ['Euskara',         ['eu-ES']],
        ['Français',        ['fr-FR']],
        ['Galego',          ['gl-ES']],
        ['Hrvatski',        ['hr_HR']],
        ['IsiZulu',         ['zu-ZA']],
        ['Íslenska',        ['is-IS']],
        ['Italiano',        ['it-IT', 'Italia'],
            ['it-CH', 'Svizzera']],
        ['Magyar',          ['hu-HU']],
        ['Nederlands',      ['nl-NL']],
        ['Norsk bokmål',    ['nb-NO']],
        ['Polski',          ['pl-PL']],
        ['Português',       ['pt-BR', 'Brasil'],
            ['pt-PT', 'Portugal']],
        ['Română',          ['ro-RO']],
        ['Slovenčina',      ['sk-SK']],
        ['Suomi',           ['fi-FI']],
        ['Svenska',         ['sv-SE']],
        ['Türkçe',          ['tr-TR']],
        ['български',       ['bg-BG']],
        ['Pусский',         ['ru-RU']],
        ['Српски',          ['sr-RS']],
        ['한국어',            ['ko-KR']],
        ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
            ['cmn-Hans-HK', '普通话 (香港)'],
            ['cmn-Hant-TW', '中文 (台灣)'],
            ['yue-Hant-HK', '粵語 (香港)']],
        ['日本語',           ['ja-JP']],
        ['Lingua latīna',   ['la']]];

select_language.selectedIndex = 28;

select_dialect.selectedIndex = 28;




var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;

        start_img.src = 'mic-animate.gif';
    };

    recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
            start_img.src = 'mic.gif';
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = 'mic.gif';
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = 'mic.gif';
        if (!final_transcript) {


            return;
        }

        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }

    };

    recognition.onresult = function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        // final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);

    };
}

function upgrade() {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {

    // responsiveVoice.speak(s , "Korean Female");
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
// function capitalize(s) {
//     return s.replace(first_char, function(m) { return m.toUpperCase(); });
// }



function startButton(event) {

    if (recognizing) {

        recognition.stop();
        return;
    }




    final_transcript = '';
    recognition.lang = select_dialect.value;
    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    start_img.src = 'mic-animate.gif';
    start_timestamp = event.timeStamp;
}


$(".xbtn").click(function(){
    $(".final").text("")
})

$(".sidebar-content").click(function(){
    ;
    if($(this).is(".sug")){
        $(".suggestion").css({"display":"block"});
        $(".dashboard").css({"display":"none"});
        $(".sidebar-content").css({"background-color":"white"});
        $(".sidebar-content").css({"color":"black"});
        $(this).css({"background-color":"black"});
        $(this).css({"color":"white"})
    }
    else if($(this).is(".dash")){
        // $(".suggestion").css({"display":"none"});
        // $(".dashboard").css({"display":"block"});
        alert("준비중입니다")
    }
    else{
        history.back()
    }
})

$(".pbtn").click(function(){
    var text = $(".final").text();
    if(text == ""){

    }
    else{
        $(".chatbox").append("<div class='fullbox'><span class=\"rt\"> 나 : "+text+"</span></div>");
        $(".final").text("")
        $.ajax({
            method:"POST",
            url:"http://localhost:8016/send",
            data:{"message":text},
            success:function(data){
                console.log(data)
                responsiveVoice.speak(data,"Korean Female");
                $(".chatbox").append("<div class='fullbox'><span class=\"lt\"> 자비스 : "+data+"</span></div>");
            },
            error:function(err){
                console.log(err);
            }
        })
    }


})

$(document).ready(function(){
    $(".suggestion").css({"display":"block"});
    $(".dashboard").css({"display":"none"});

    $(".sug").css({"background-color":"black"});
    $(".sug").css({"color":"white"});
})