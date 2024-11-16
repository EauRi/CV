var jeux1Lance = 0, jeux2Lance = 0, jeux3Lance = 0, interval, interval2, interval3, intervalQuestion1, intervalQuestion4, rep3, points = 9;
let temps = 60, temps2 = 60, temps3 = 120, tempsTab = 60, tempsJeux = 60, secondes, secondes2,  secondes3, secondesTab, secondesJeux, minutes;
var reponses = new Array(), reponsesEnd = new Array(), repEnd = new Array(), repStart = new Array(), repRel= new Array();
var vrai = new Boolean(false), q3 = new Boolean(false), q4 = new Boolean(false);
let indices = 0;


// Pour Q1 :
function q1() {

    var url = 'https://api.conceptnet.io/c/en/';
    var mots = new Array("philosophy", "kitchen", "dog", "cat", "banana", "chicken", "airplane", "cool", "devil", "angel", "nose", "hand", "aboriginal", "aboriginality", "aboriginally", "aboriginals", "aboriginary", "aborigine", "aborigine", "aborigines", "aborning", "aborsement", "aborsive", "ball", "ballad", "ballade", "balladeer", "balladeers", "balladise", "balladised", "barbican","blowers","brawn", "brunts", "bruscha", "bruscus", "brush", "capillose", "capillus", "capilotade", "caping", "iridaceous", "iridadenosis", "iridal", "iridalgia", "iridate","warmest", "warmful", "warmhearted", "zen");
 
    // set bouton invisible
    document.getElementById("a1").setAttribute("disabled", true); 
    document.getElementById("a2").setAttribute("disabled", true); 

    let table = document.createElement('table');
    table.setAttribute("id", "question1");
    let row0 = document.createElement('tr');
    let col1_1 = document.createElement('td');
    col1_1.innerHTML = "Start";
    let col1_2 = document.createElement('td');
    col1_2.innerHTML = "Relation";
    let col1_3 = document.createElement('td');
    col1_3.innerHTML = "End";

    var diff_Relation = new Array();
    var count = 1;

    row0.appendChild(col1_1);
    row0.appendChild(col1_2);
    row0.appendChild(col1_3);
    table.appendChild(row0);

    for(j=0 ; j<mots.length ; j++){

        if(count > 100)
            break;

        fetch(url+mots[j], { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {
            
            for(i=0 ; i<string['edges'].length-1 ; i++){

                if(count > 100)
                    break;

                var r = string['edges'][i]['rel']['label'];
                var isInRel = false;

                for( k=0 ; k<diff_Relation.length ; k++){
                    if(r == diff_Relation[k]){
                        isInRel = true;
                        break;
                    }
                }
                if(!isInRel){
                    row0 = document.createElement('tr');
                    col1_1 = document.createElement('td');
                    col1_1.innerHTML = string['edges'][i]['start']['term'];
                    col1_2 = document.createElement('td');
                    col1_2.innerHTML = r ;
                    col1_3 = document.createElement('td');
                    col1_3.innerHTML = string['edges'][i]['end']['term'];

                    row0.appendChild(col1_1);
                    row0.appendChild(col1_2);
                    row0.appendChild(col1_3);
                    table.appendChild(row0);
                    count++;

                    diff_Relation[diff_Relation.length] = r;
                    if(count > 100)
                        break;
                }
                else if(diff_Relation.length > 20){
                    row0 = document.createElement('tr');
                    col1_1 = document.createElement('td');
                    col1_1.innerHTML = string['edges'][i]['start']['term'];
                    col1_2 = document.createElement('td');
                    col1_2.innerHTML = r ;
                    col1_3 = document.createElement('td');
                    col1_3.innerHTML = string['edges'][i]['end']['term'];

                    row0.appendChild(col1_1);
                    row0.appendChild(col1_2);
                    row0.appendChild(col1_3);
                    table.appendChild(row0);
                    count++;
                    if(count > 100)
                        break;
                }
                if(count > 100)
                    break;
            }
        if (count > 100 )
            document.getElementById('body').appendChild(table);
        })
        .catch(errorMsg => { console.log(errorMsg); });
        if(count > 100)
            break;
    }
    intervalQuestion1 = setInterval(function(){
        secondesTab = parseInt(tempsTab % 60, 10);
        secondesTab = secondesTab < 1 ? "6" + secondesTab : secondesTab;
        tempsTab = tempsTab <= 0 ? 0 : tempsTab - 1;
        if(document.getElementById("question1") != undefined){ // Set boutons visible le temps de chargement du fetch
            clearInterval(intervalQuestion1);     
            tempsTab = 60;      
            document.getElementById("a1").disabled = false;  
            document.getElementById("a2").disabled = false;      
        }
    }, 1000);
}



// Fonctions pour le jeux "Oui-Non" 
function yesNo(){

    var url = 'https://api.conceptnet.io/c/en/';
    var mots = new Array("philosophy", "kitchen", "dog", "cat", "banana", "chicken", "airplane", "cool", "devil", "angel", "nose", "hand", "aboriginal", "ball", "ballad", "barbican", "brush", "capillose", "warmhearted", "zen","reception","heel","rabbit","understanding","sin","loop","carbon","money","breed","orchestra","solve","code","string","think","country","era","native","pioneer","giant","childish","voter","popular","cake","metal","decide","consequence","throne","emergency","bubbles","cookies");
    var start = new Array(), end = new Array(), relation = new Array();
    var count = 0;

    for(j=0 ; j<mots.length ; j++){

        fetch(url+mots[j], { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {
            for(i=0 ; i<string['edges'].length-1 ; i++){

                if((string['edges'][i]['start']['language'] == 'en' ||
                    string['edges'][i]['start']['language'] == 'fr') &&
                    (string['edges'][i]['end']['language'] == 'en' ||
                    string['edges'][i]['end']['language'] == 'fr')){

                    if(string['edges'][i]['rel']['label'] != 'ExternalURL'){
                        start[count] = string['edges'][i]['start']['term'];
                        relation[count] = string['edges'][i]['rel']['label'];
                        end[count] = string['edges'][i]['end']['term'];
                        count++;    
                    }
                }
            }     
            if(start.length == 312){
                document.getElementById("game1").setAttribute("disabled", true); 
                var nombre = Math.floor(Math.random() * (start.length + 1));
				var rela = relation[nombre];
				while(rela === 'DistinctFrom'){
					nombre = Math.floor(Math.random() * (start.length + 1));
					rela = relation[nombre];
				}
                var mot = start[nombre].substring(6, start[nombre].length);
                var reponse = end[nombre].substring(6, end[nombre].length);
                
                if(Math.random() > 0.5){
                    nombre = Math.floor(Math.random() * (start.length + 1));
                    while(relation[nombre] == rela || start[nombre] == end[nombre].substring(6, end[nombre].length))
                        nombre = Math.floor(Math.random() * (start.length + 1));
                    var reponse2 = end[nombre].substring(6, end[nombre].length);
                    
                }
                else
                    var reponse2 = end[nombre].substring(6, end[nombre].length);
				console.log(reponse)
                if(reponse === reponse2)
                    vrai = true;
                var question = document.getElementById("question");
                question.innerHTML = ("Is " + mot + " " + rela + " " +  reponse2 + " ?");
                if(jeux1Lance > 0){ 
                    document.getElementById("butOK").disabled = false; 
                    document.getElementById("anwserFinal").innerHTML = '';
                    document.getElementById("repFinal").remove();
                    document.getElementById("repNon").remove();
                    document.getElementById("repOui").remove();
                    document.getElementById("lab1").remove();
                    document.getElementById("lab2").remove();
                    document.getElementById("butOK").remove();
                    document.getElementById("timer").remove();
                }
                let inp1 = document.createElement('input');
                inp1.setAttribute("type", "radio");
                inp1.setAttribute("id", "repOui");
                inp1.setAttribute("value", "oui");
                inp1.setAttribute("name", "rep");
                let lab1 = document.createElement("label");
                lab1.setAttribute("for", "oui");
                lab1.setAttribute("id", "lab1");
                lab1.appendChild(document.createTextNode("Oui"));

                let inp2 = document.createElement('input');
                inp2.setAttribute("type", "radio");
                inp2.setAttribute("id", "repNon");
                inp2.setAttribute("value", "non");
                inp2.setAttribute("name", "rep");
                let lab2 = document.createElement("label");
                lab2.setAttribute("for", "non");
                lab2.setAttribute("id", "lab2");
                lab2.appendChild(document.createTextNode("Non"));

                let ok = document.createElement('button');
                ok.appendChild(document.createTextNode("OK"));
                ok.setAttribute("id", "butOK");
                ok.setAttribute("class", "btn btn-info");
                ok.setAttribute("onclick", "reponseYesNo();");

                let time = document.createElement('p');
                time.appendChild(document.createTextNode(""));
                time.setAttribute("id", "timer");

                document.getElementById('anwser').appendChild(inp1);
                document.getElementById('anwser').appendChild(lab1);
                document.getElementById('anwser').appendChild(inp2);
                document.getElementById('anwser').appendChild(lab2);
                document.getElementById('anwser').appendChild(ok);
                document.getElementById('anwser').appendChild(time);
                jeux1Lance++;
            }   
        }).catch(errorMsg => { console.log(errorMsg); });
    }                    
    interval = setInterval(function(){
        var time = document.getElementById("timer");
        secondes = parseInt(temps % 60, 10);
        secondes = secondes < 1 ? "6" + secondes : secondes;
        time.innerHTML = secondes;
        temps = temps <= 0 ? 0 : temps - 1;
        if(secondes == "1"){  
            time.innerHTML = "00";
            var butt = document.getElementById("butOK");
            butt.setAttribute("disabled", "true");
            clearInterval(interval);     
            temps = 60;      
            document.getElementById("game1").disabled = false;        
            let rep = document.createElement('p');
            rep.appendChild(document.createTextNode("Perdu..."));
            rep.setAttribute("id", "repFinal");
            document.getElementById('anwserFinal').appendChild(rep);
        }
    }, 1000);
}


function reponseYesNo(){

    var stringRep = "";
    if((vrai && document.getElementById("repOui").checked) || (!vrai && document.getElementById("repNon").checked)){
        stringRep = "Gagné !";        
        clearInterval(interval); 
        temps = 60;      
        vrai = false;
        document.getElementById("game1").disabled = false;
        document.getElementById("repOui").checked = false;
        document.getElementById("repNon").checked = false;
        document.getElementById("butOK").disabled = true;  
    }
    else if(!document.getElementById("repOui").checked && !document.getElementById("repNon").checked)
        stringRep = "Veuillez répondre !";
    else {         
        stringRep = "Perdu...";
        clearInterval(interval);   
        temps = 60;           
        vrai = false;
        document.getElementById("game1").disabled = false;
        document.getElementById("repOui").checked = false;
        document.getElementById("repNon").checked = false;
        document.getElementById("butOK").disabled = true; 
    }    
    let rep = document.createElement('p');
    rep.appendChild(document.createTextNode(stringRep));
    rep.setAttribute("id", "repFinal");
    document.getElementById('anwserFinal').appendChild(rep);
    
}


// Fonctions pour le jeux "Consigne" 
function consigne(){

    var url = new Array('https://api.conceptnet.io/c/en/', 'https://api.conceptnet.io/c/fr/');
    var mots = new Array("polaris", "stress", "patate", "basic", "zen", "ko", "ok", "monde", "same", "bien", "fruit", "table", "beau", "rapide", "coucou", "chill", "nocturne", "lune", "club", "cheval");
    var mot = mots[Math.floor(Math.random() * mots.length)];

    // On prend les synonymes grâce au fetch
    for(j=0 ; j<2 ; j++){
        fetch(url[j]+mot, { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {
            
            for(i=0 ; i<string['edges'].length-1 ; i++){

                if((string['edges'][i]['start']['language'] == 'en' ||
                string['edges'][i]['start']['language'] == 'fr') &&
                (string['edges'][i]['end']['language'] == 'en' ||
                string['edges'][i]['end']['language'] == 'fr')){
                    if("Synonym" === string['edges'][i]['rel']['label'])
                        reponsesEnd.push(string['edges'][i]['end']['term'].substring(6, string['edges'][i]['end']['term'].length));
                }
            }
            reponses = Array.from(new Set(reponsesEnd));
        }).catch(errorMsg => { console.log(errorMsg); });
    }   
    document.getElementById("game2").setAttribute("disabled", "true"); 
    document.getElementById("question2").innerHTML = (mot + " Synonym ? ");

    if(jeux2Lance > 0){       
        document.getElementById("anwserFinal2").innerHTML = '';
        document.getElementById("inpCons").remove();
        document.getElementById("butCons").remove();
        document.getElementById("timer2").remove();
    }

    // On créé les élements de réponses
    let inp = document.createElement('input');
    inp.setAttribute("id", "inpCons");

    let ok = document.createElement('button');
    ok.appendChild(document.createTextNode("OK"));
    ok.setAttribute("id", "butCons");
    ok.setAttribute("class", "btn btn-info");
    ok.setAttribute("onclick", "reponseConsigne();");

    let time = document.createElement('p');
    time.appendChild(document.createTextNode(""));
    time.setAttribute("id", "timer2");

    document.getElementById('anwser2').appendChild(inp);
    document.getElementById('anwser2').appendChild(ok);
    document.getElementById('anwser2').appendChild(time);  
    jeux2Lance++; 
    // Fonction du temps (1 minute)
    interval2 = setInterval(function(){  
        var time = document.getElementById("timer2");
        secondes2 = parseInt(temps2 % 60, 10);
        secondes2 = secondes2 < 1 ? "6" + secondes2 : secondes2;
        time.innerHTML = secondes2;
        temps2 = temps2 <= 0 ? 0 : temps2 - 1;  
        if(secondes2 == "1"){ // Le temps est écoulé
            time.innerHTML = "00";
            var butt = document.getElementById("butCons");
            butt.setAttribute("disabled", "true");
            clearInterval(interval2);           
            temps2 = 60;
            document.getElementById("game2").disabled = false;
            let rep = document.createElement('p');
            rep.setAttribute("id", "finish");
            rep.appendChild(document.createTextNode("Temps écoulé !"));
            document.getElementById('anwserFinal2').appendChild(rep);
        }
    }, 1000);
}

function reponseConsigne(){
         
    //console.log(reponses); //Pour avoir les réponses
    let rep = document.getElementById("inpCons").value;
    var indice = reponses.findIndex(mot => mot === rep);

    if(rep == "")
        document.getElementById("inpCons").placeholder = "Mettre un mot !";
    else{
        document.getElementById("inpCons").placeholder = "Mettre un nouveau mot !";    
        if(indice < 0) // Pas dans le tableau, on rajoute aucun point
            rep += " + 0"; 
        else{ // On rajoute 1 point
            rep += " + 1"; 
            reponses.splice(indice, 1);
            if(reponses.length == 0){ // Si on a finit les indices
                var butt = document.getElementById("butCons");
                butt.setAttribute("disabled", "true");
                clearInterval(interval2); 
                temps2 = 60;
                rep = "Tous les synonymes sont présent ! Bravo !";
                document.getElementById("game2").disabled = false;
                document.getElementById("inpCons").placeholder = ""; 
            }
        } 
        document.getElementById("inpCons").value = "";
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(rep));
        p.setAttribute("id", "repFinal2");
        document.getElementById('anwserFinal2').appendChild(p);
    }
}


// Fonctions pour le jeux "Qui suis-je ?" 
function quiSuis(){
    
    var url = 'https://api.conceptnet.io/c/en/';
    var mots = new Array("philosophy", "kitchen", "dog", "cat", "banana", "chicken", "airplane", "cool", "devil", "angel", "nose", "hand", "polaris", "stress", "basic", "zen", "ko", "ok", "monde", "same", "fruit", "table", "fast", "coucou", "nocturne", "lune", "club", "bird");
    rep3 = mots[Math.floor(Math.random() * mots.length)]
    console.log(rep3); // Pour avoir la réponse

    // On prend les éléments besoin pour le mot en question
    fetch(url+rep3, { method: 'GET' })
    .then(Result => Result.json())
    .then(string => {
        
        for(i=0 ; i<string['edges'].length-1 ; i++){

            if((string['edges'][i]['start']['language'] == 'en' ||
            string['edges'][i]['start']['language'] == 'fr') &&
            (string['edges'][i]['end']['language'] == 'en' ||
            string['edges'][i]['end']['language'] == 'fr')){
                    repEnd.push(string['edges'][i]['end']['term'].substring(6, string['edges'][i]['end']['term'].length));
                    repRel.push(string['edges'][i]['rel']['label']);
                    repStart.push(string['edges'][i]['start']['term'].substring(6, string['edges'][i]['start']['term'].length));
            }
        }
    }).catch(errorMsg => { console.log(errorMsg); });
    document.getElementById("game3").setAttribute("disabled", "true");

    if(jeux3Lance > 0){       
        document.getElementById("anwserFinal3").innerHTML = '';
        document.getElementById("inpQui").remove();
        document.getElementById("butQui").remove();
        document.getElementById("timer3").remove();
    }

    // On créé les élements de réponses
    let inp = document.createElement('input');
    inp.setAttribute("id", "inpQui");

    let ok = document.createElement('button');
    ok.appendChild(document.createTextNode("OK"));
    ok.setAttribute("id", "butQui");
    ok.setAttribute("class", "btn btn-info");
    ok.setAttribute("onclick", "reponseQui();");

    let time = document.createElement('p');
    time.appendChild(document.createTextNode(""));
    time.setAttribute("id", "timer3");

    document.getElementById('anwser3').appendChild(inp);
    document.getElementById('anwser3').appendChild(ok);
    document.getElementById('anwser3').appendChild(time); 
    jeux3Lance++;

    // Fonction du temps (2 minutes)
    interval3 = setInterval(function(){  

        var time = document.getElementById("timer3");
        minutes = parseInt(temps3 / 60, 10);
        secondes3 = parseInt(temps3 % 60, 10);
        secondes4 = parseInt(temps3 % 20, 10); 
        secondes4 = secondes4 < 10 ? "0" + secondes4 : secondes4;
        minutes = minutes < 600 ? "0" + minutes : minutes;
        secondes3 = secondes3 < 10 ? "0" + secondes3 : secondes3;
        time.innerText = `${minutes}:${secondes3}`;
        temps3 = temps3 <= 0 ? 0 : temps3 - 1;

        if(`${minutes}:${secondes3}` === "00:01" || repEnd.length === 0){ // Fin
            document.getElementById("game3").disabled = false;
            temps3 = 120;
            indices = 0;
            clearInterval(interval3);
            let p = document.createElement('p');
            if(`${minutes}:${secondes3}` === "00:01"){ // A cause du temps
                time.innerHTML = "0:00";
                p.appendChild(document.createTextNode("Temps écoulé !" + points + " points."));
            }
            else if(repEnd.length === 0) // A cause du tableau vide
				points = 0;
                p.appendChild(document.createTextNode("Tous les indices ont été utilisés. Vous avez " + points + " points."));
            document.getElementById('anwserFinal3').appendChild(p);
        }

        if(secondes4 == "00"){ // Chaque fin 20 secondes pour les indices
            points--;
            var rand = Math.floor(Math.random() * repStart.length);
            let indice = "";
            var r = repRel[rand];
            var s = repStart[rand];
            var e = repEnd[rand];
            if(!condEnd()) 
                indice = s + " " + r + " ???";  
            else if(!condStart())
                indice =  "??? " + r + " " + e;
            else if(indices%2 == 0) { // Pour faire une alternance de relation avec end et start
                while(e == rep3){
                    rand = Math.floor(Math.random() * repStart.length);
                    r = repRel[rand];
                    e = repEnd[rand];
                }                
                indice =  "??? " + r + " " + e;
            }
            else {
                while(s == rep3){
                    rand = Math.floor(Math.random() * repStart.length);
                    r = repRel[rand];
                    s = repStart[rand];
                } 
                indice = s + " " + r + " ???";  
            }          
            // On enlèvent les indices de leur tableau respectif  
            repRel.splice(rand, 1);
            repStart.splice(rand, 1);
            repEnd.splice(rand, 1);
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(indice));
            document.getElementById('anwserFinal3').appendChild(p);
            indices++;
        }
    }, 1000)
	repEnd = []; // Quand le fetch est trop lent, grâce a ça le jeu plante tout de suite au lieu de donner de faux indices, peut être mettre une valeur spéciale pour regarder si le fetch s'est mal passé ou non
	repRel = [];
	repStart = [];
    points = 9;
}

function condEnd(){ // Sert à savoir si la réponse est que dans la fin
    for(i=0 ; i<repEnd.length ; i++){
        if(rep3 != repEnd[i])
            return true;
    }
    return false;
}
function condStart(){ // Sert à savoir si la réponse est que dans le début
    for(i=0 ; i<repStart.length ; i++){
        if(rep3 != repStart[i])
            return true;
    }
    return false;
}

function reponseQui(){

    if(rep3 === document.getElementById("inpQui").value){ // Il a trouvé la solution
        document.getElementById("game3").disabled = false; 
            temps3 = 120;
            indices = 0;
            clearInterval(interval3);
            let p = document.createElement('p');
            p.appendChild(document.createTextNode("Bravo ! Vous avez " + points + " points."));
            document.getElementById('anwserFinal3').appendChild(p);
    }
    document.getElementById("inpQui").value = "";
    document.getElementById("inpQui").placeholder = "Retry";
}

// Fonctions annexes pour l'interface : 
// Menu 
function menu(){
	//réinitialisation des variables
	jeux1Lance = 0, jeux2Lance = 0, jeux3Lance = 0, interval=0, interval2=0, interval3=0, intervalQuestion1=0, intervalQuestion4=0, rep3, points = 9;
	temps = 60, temps2 = 60, temps3 = 120, tempsTab = 60, tempsJeux = 10,tempsJeux2 = 10, tempsJeux3 = 10, secondes=0, secondes2=0,  secondes3=0, secondesTab=0, secondesJeux=0, secondesJeux2 = 0, secnodesJeux3 = 0, minutes=0;
	reponses = [], reponsesEnd = [], repEnd = [], repStart = [], repRel= [];
	vrai = false;
	indices = 0;
        
    clearInterval(intervalQuestion1);
    clearInterval(intervalQuestion1);

    if(q3 == true){
        document.getElementById('h').remove();
        document.getElementById('f1').remove();
        document.getElementById('f2').remove();
        document.getElementById('f3').remove();
        document.getElementById('sol').remove();
        document.getElementById('h2').remove();
        q3 = false;
    }
    else if(q4 == true){        
        clearInterval(interval);
        temps = 60;    
        clearInterval(interval2);
        temps2 = 60;
        clearInterval(interval3);
        temps3 = 120;
        document.getElementById('header').remove();
        document.getElementById('divMilieu').remove();
        q4 = false;
    }
    document.title = "Menu (q2)";

    let a1 = document.createElement('button');
    a1.setAttribute("id", "a1");
    a1.setAttribute("class", "btn btn-outline-secondary butt");
    a1.appendChild(document.createTextNode("Consultation"));
    a1.setAttribute("onclick", "question3();");

    let a2 = document.createElement('button');
    a1.setAttribute("id", "a2");
    a2.setAttribute("class", "btn btn-outline-secondary butt");
    a2.setAttribute("onclick", "question4();");
    a2.appendChild(document.createTextNode("Jeux")); 

    let cent = document.createElement("div");
    cent.setAttribute("id", "center");
    cent.setAttribute("class", "center");
    cent.appendChild(a1);
    cent.appendChild(a2);
    document.getElementById('body').appendChild(cent);
    document.getElementById('body').setAttribute("onload", "q1();");
}

// Jeux
function question4(){

    q4 = true;
    // Pour enlever le menu :
    document.getElementById('center').remove();    
    document.getElementById('body').removeAttribute("onload");
    if(document.getElementById('question1') != undefined)
        document.getElementById('question1').remove();

    // Header
    let head = document.createElement("header");
    let div = document.createElement("div");
    div.setAttribute("id", "header");
    let a = document.createElement("a");
    a.setAttribute("type", "button");
    a.setAttribute("class", "btn btn-outline-danger");
    a.setAttribute("onclick", "menu();");
    a.setAttribute("id", "menuHead");
    a.appendChild(document.createTextNode("Menu"));
    head.appendChild(div);
    div.appendChild(a);
    document.getElementById('body').appendChild(head);

    // Autour des boxs : 
    let divM = document.createElement("div");
    divM.setAttribute("id", "divMilieu");

    // Box 1 :
    document.title = "Jeux (q4)";
    let box1 = document.createElement("div");
    box1.setAttribute("id", "box1");
    let div1 = document.createElement("div");
    let but1 = document.createElement("button");
    but1.setAttribute("disabled", true);
    but1.setAttribute("type", "button");
    but1.setAttribute("class", "btn btn-outline-dark bu");
    but1.setAttribute("onClick", "yesNo();");
    but1.setAttribute("id", "game1");
    but1.appendChild(document.createTextNode("Oui-Non"));
    let p1 = document.createElement("p");
    p1.setAttribute("id", "question");
    let div2 = document.createElement("div");
    div2.setAttribute("id", "anwser");
    let div3 = document.createElement("div");
    div3.setAttribute("id", "anwserFinal");

    box1.appendChild(div1);
    box1.appendChild(but1);
    box1.appendChild(p1);
    box1.appendChild(div2);
    box1.appendChild(div3);

    // Box 2 :
    let box2 = document.createElement("div");
    box2.setAttribute("id", "box2");
    div1 = document.createElement("div");
    but1 = document.createElement("button");
    but1.setAttribute("disabled", true);
    but1.setAttribute("type", "button");
    but1.setAttribute("class", "btn btn-outline-dark bu");
    but1.setAttribute("onClick", "consigne();");
    but1.setAttribute("id", "game2");
    but1.appendChild(document.createTextNode("Consigne"));
    p1 = document.createElement("p");
    p1.setAttribute("id", "question2");
    div2 = document.createElement("div");
    div2.setAttribute("id", "anwser2");
    div3 = document.createElement("div");
    div3.setAttribute("id", "anwserFinal2");

    box2.appendChild(div1);
    box2.appendChild(but1);
    box2.appendChild(p1);
    box2.appendChild(div2);
    box2.appendChild(div3);

    // Box 3 :
    let box3 = document.createElement("div");
    box3.setAttribute("id", "box3");
    div1 = document.createElement("div");
    but1 = document.createElement("button");
    but1.setAttribute("disabled", true);
    but1.setAttribute("type", "button");
    but1.setAttribute("class", "btn btn-outline-dark bu");
    but1.setAttribute("onClick", "quiSuis();");
    but1.setAttribute("id", "game3");
    but1.appendChild(document.createTextNode("Qui suis-je ?"));
    p1 = document.createElement("p");
    p1.setAttribute("id", "question3");
    div2 = document.createElement("div");
    div2.setAttribute("id", "anwser3");
    div3 = document.createElement("div");
    div3.setAttribute("id", "anwserFinal3");

    box3.appendChild(div1);
    box3.appendChild(but1);
    box3.appendChild(p1);
    box3.appendChild(div2);
    box3.appendChild(div3);

    divM.appendChild(box1);
    divM.appendChild(box2);
    divM.appendChild(box3);
    document.getElementById('body').appendChild(divM);

    intervalQuestion4 = setInterval(function(){
        secondesJeux = parseInt(tempsJeux % 60, 10);
        secondesJeux = secondesJeux < 1 ? "6" + secondesJeux : secondesJeux;
        tempsJeux = tempsJeux <= 0 ? 0 : tempsJeux - 1;
        if(secondesJeux == "59"){ // Set boutons visible le temps de chargement du fetch
            clearInterval(intervalQuestion4);     
            tempsJeux = 60;      
            document.getElementById("game1").disabled = false; 
            document.getElementById("game2").disabled = false; 
            document.getElementById("game3").disabled = false;        
        }
    }, 1000);
}

// Consultation
function question3(){

    q3 = true;
    q3Lance = 0;
    // Pour enlever le menu :
    document.getElementById('center').remove();
    document.getElementById('body').removeAttribute("onload");
    if(document.getElementById('question1') != undefined)
        document.getElementById('question1').remove();
    document.title = "Consultation (q3)";
    
    // Header
    let head = document.createElement("header");
    head.setAttribute("id", "h");
    let div = document.createElement("div");
    div.setAttribute("id", "header");
    let a = document.createElement("a");
    a.setAttribute("type", "button");
    a.setAttribute("class", "btn btn-outline-danger");
    a.setAttribute("onclick", "menu();");
    a.setAttribute("id", "menuHead");
    a.appendChild(document.createTextNode("Menu"));
    head.appendChild(div);
    div.appendChild(a);
    document.getElementById('body').appendChild(head);

    // Précédent et suivant :
    let d = document.createElement("div");
    d.setAttribute("class", "head");
    d.setAttribute("id", "h2");
    let but1 = document.createElement("button");
    but1.setAttribute("type", "button");
    but1.setAttribute("class", "btn btn-outline-dark space");
    but1.setAttribute("onClick", "prev();");
    but1.appendChild(document.createTextNode("Précédent"));
    let but2 = document.createElement("button");
    but2.setAttribute("type", "button");
    but2.setAttribute("class", "btn btn-outline-dark space");
    but2.setAttribute("onClick", "next();");
    but2.appendChild(document.createTextNode("Suivant"));

    d.appendChild(but1);
    d.appendChild(but2);
    document.getElementById('body').appendChild(d);

    // Créer tableau avec seulement start / end    
    let di1 = document.createElement("div");
    di1.setAttribute("class", "input-group mb-3");
    di1.setAttribute("id", "f1");
    let d1 = document.createElement("div");
    d1.setAttribute("class", "input-group-prepend"); 
    let bu1 = document.createElement("button");
    bu1.setAttribute("type", "button");
    bu1.setAttribute("class", "btn btn-outline-secondary form");
    bu1.setAttribute("onClick", "startEnd();");
    bu1.appendChild(document.createTextNode("Solution pour"));
    let s = document.createElement("span");
    s.appendChild(document.createTextNode("(Start / End)"));   
    let i = document.createElement("input");
    i.setAttribute("type", "text");
    i.setAttribute("class", "form-control");
    i.setAttribute("placeholder", "Start / End");
    i.setAttribute("aria-label", "send");
    i.setAttribute("id", "startEnd");

    di1.appendChild(d1);    
    d1.appendChild(bu1);
    bu1.appendChild(s);
    di1.appendChild(i);
    document.getElementById('body').appendChild(di1);
    
    // Créer tableau avec seulement relation  
    let di2 = document.createElement("div");
    di2.setAttribute("class", "input-group mb-3");
    di2.setAttribute("id", "f2"); 
    let di3 = document.createElement("div");
    di3.setAttribute("class", "input-group-prepend"); 
    let bu = document.createElement("button");
    bu.setAttribute("type", "button");
    bu.setAttribute("class", "btn btn-outline-secondary form");
    bu.setAttribute("onClick", "rel();");
    bu.appendChild(document.createTextNode("Solution pour"));
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("(Relation)"));   
    let i2 = document.createElement("input");
    i2.setAttribute("type", "text");
    i2.setAttribute("class", "form-control");
    i2.setAttribute("placeholder", "Relation");
    i2.setAttribute("aria-label", "send");
    i2.setAttribute("id", "relation");

    di2.appendChild(di3);    
    di3.appendChild(bu);
    bu.appendChild(span);
    di2.appendChild(i2);
    document.getElementById('body').appendChild(di2);

    // Créer tableau avec start / end et relation
    let di4 = document.createElement("div");
    di4.setAttribute("class", "input-group mb-3");
    di4.setAttribute("id", "f3");
    let d4 = document.createElement("div");
    d4.setAttribute("class", "input-group-prepend"); 
    let b = document.createElement("button");
    b.setAttribute("type", "button");
    b.setAttribute("class", "btn btn-outline-secondary form");
    b.setAttribute("onClick", "relStartEnd();");
    b.appendChild(document.createTextNode("Solution pour"));
    let sp = document.createElement("span");
    sp.appendChild(document.createTextNode("(Start / End et Relation)"));   
    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("class", "form-control");
    inp.setAttribute("placeholder", "Start / End");
    inp.setAttribute("aria-label", "send");
    inp.setAttribute("id", "relationStartEnd1");
    let inp2 = document.createElement("input");
    inp2.setAttribute("type", "text");
    inp2.setAttribute("class", "form-control");
    inp2.setAttribute("placeholder", "Relation");
    inp2.setAttribute("aria-label", "send");
    inp2.setAttribute("id", "relationStartEnd2");

    di4.appendChild(d4);    
    d4.appendChild(b);
    b.appendChild(sp);
    di4.appendChild(inp);
    di4.appendChild(inp2);
    document.getElementById('body').appendChild(di4);

    // Où sera la table de solution
    let di = document.createElement("div")
    di.setAttribute("id", "sol");
    document.getElementById('body').appendChild(di);
}


// Fonctions pour Q3 : 
var url = new Array('https://api.conceptnet.io/c/en/', 'https://api.conceptnet.io/c/fr/');
var urlRelation = 'https://api.conceptnet.io/r/';
var urlPages = 'https://api.conceptnet.io';
var urlJson = "", relationQ3 = "";
var countQ3 = 1;
var q3Lance = 0;

function next(){

    if(q3Lance > 0)
        document.getElementById("tab").remove();
    let div = document.createElement('div');
    div.className = "solution";
    let table = document.createElement('table');
    table.setAttribute('id', "tab");
    let row0 = document.createElement('tr');
    let col1_1 = document.createElement('td');
    col1_1.innerHTML = "Start";
    let col1_2 = document.createElement('td');
    col1_2.innerHTML = "Relation";
    let col1_3 = document.createElement('td');
    col1_3.innerHTML = "End";
    let col1_0 = document.createElement('td');
    col1_0.innerHTML = "";

    row0.appendChild(col1_0);
    row0.appendChild(col1_1);
    row0.appendChild(col1_2);
    row0.appendChild(col1_3);
    table.appendChild(row0);
    div.appendChild(table);

    fetch(urlPages+urlJson['view']['nextPage'], { method: 'GET' })
    .then(Result => Result.json())
    .then(string => {
    
        urlJson = string;
        for(i=0 ; i<string['edges'].length-1 ; i++){

            if((string['edges'][i]['start']['language'] == 'en' ||
            string['edges'][i]['start']['language'] == 'fr') &&
            (string['edges'][i]['end']['language'] == 'en' ||
            string['edges'][i]['end']['language'] == 'fr')){

                row0 = document.createElement('tr');
                col1_0 = document.createElement('td');
                col1_0.innerHTML = countQ3;
                countQ3++;
                col1_1 = document.createElement('td');
                col1_1.innerHTML = string['edges'][i]['start']['term'];
                col1_2 = document.createElement('td');
                col1_2.innerHTML = string['edges'][i]['rel']['label'];
                col1_3 = document.createElement('td');
                col1_3.innerHTML = string['edges'][i]['end']['term'];

                row0.appendChild(col1_0);
                row0.appendChild(col1_1);
                row0.appendChild(col1_2);
                row0.appendChild(col1_3);
                table.appendChild(row0);
            }
        }
    document.getElementById('sol').appendChild(div);
    countQ3 = 1;
    }).catch(errorMsg => { console.log(errorMsg); }); 
    q3Lance++;
}


function prev(){
    
    if(q3Lance > 0)
        document.getElementById("tab").remove();
    let div = document.createElement('div');
    div.className = "solution";
    let table = document.createElement('table');
    table.setAttribute('id', "tab");
    let row0 = document.createElement('tr');
    let col1_1 = document.createElement('td');
    col1_1.innerHTML = "Start";
    let col1_2 = document.createElement('td');
    col1_2.innerHTML = "Relation";
    let col1_3 = document.createElement('td');
    col1_3.innerHTML = "End";
    let col1_0 = document.createElement('td');
    col1_0.innerHTML = "";

    row0.appendChild(col1_0);
    row0.appendChild(col1_1);
    row0.appendChild(col1_2);
    row0.appendChild(col1_3);
    table.appendChild(row0);
    div.appendChild(table);

    fetch(urlPages+urlJson['view']['firstPage'], { method: 'GET' })
    .then(Result => Result.json())
    .then(string => {
    
        urlJson = string;
        for(i=0 ; i<string['edges'].length-1 ; i++){

            if((string['edges'][i]['start']['language'] == 'en' ||
            string['edges'][i]['start']['language'] == 'fr') &&
            (string['edges'][i]['end']['language'] == 'en' ||
            string['edges'][i]['end']['language'] == 'fr')){

                row0 = document.createElement('tr');
                col1_0 = document.createElement('td');
                col1_0.innerHTML = countQ3;
                countQ3++;
                col1_1 = document.createElement('td');
                col1_1.innerHTML = string['edges'][i]['start']['term'];
                col1_2 = document.createElement('td');
                col1_2.innerHTML = string['edges'][i]['rel']['label'];
                col1_3 = document.createElement('td');
                col1_3.innerHTML = string['edges'][i]['end']['term'];

                row0.appendChild(col1_0);
                row0.appendChild(col1_1);
                row0.appendChild(col1_2);
                row0.appendChild(col1_3);
                table.appendChild(row0);
            }
        }
    document.getElementById('sol').appendChild(div);
    countQ3 = 1;
    }).catch(errorMsg => { console.log(errorMsg); }); 
    q3Lance++;
}


function startEnd(){

    var inputValue = document.getElementById("startEnd").value;

    if(inputValue == "")
        document.getElementById("startEnd").placeholder = "Veuillez mettre un mot !";

    else{
        if(q3Lance > 0)
            document.getElementById("tab").remove();
        document.getElementById("startEnd").value = "";
        let div = document.createElement('div');
        div.className = "solution";
        let table = document.createElement('table');
        table.setAttribute('id', "tab");
        let row0 = document.createElement('tr');
        let col1_1 = document.createElement('td');
        col1_1.innerHTML = "Start";
        let col1_2 = document.createElement('td');
        col1_2.innerHTML = "Relation";
        let col1_3 = document.createElement('td');
        col1_3.innerHTML = "End";
        let col1_0 = document.createElement('td');
        col1_0.innerHTML = "";

        row0.appendChild(col1_0);
        row0.appendChild(col1_1);
        row0.appendChild(col1_2);
        row0.appendChild(col1_3);
        table.appendChild(row0);
        div.appendChild(table);
        
        for(j=0 ; j<2 ; j++){
            fetch(url[j]+inputValue, { method: 'GET' })
            .then(Result => Result.json())
            .then(string => {
            
                urlJson = string;
                for(i=0 ; i<string['edges'].length-1 ; i++){

                    if((string['edges'][i]['start']['language'] == 'en' ||
                    string['edges'][i]['start']['language'] == 'fr') &&
                    (string['edges'][i]['end']['language'] == 'en' ||
                    string['edges'][i]['end']['language'] == 'fr')){
                        row0 = document.createElement('tr');
                        col1_0 = document.createElement('td');
                        col1_0.innerHTML = countQ3;
                        countQ3++;
                        col1_1 = document.createElement('td');
                        col1_1.innerHTML = string['edges'][i]['start']['term'];
                        col1_2 = document.createElement('td');
                        col1_2.innerHTML = string['edges'][i]['rel']['label'];
                        col1_3 = document.createElement('td');
                        col1_3.innerHTML = string['edges'][i]['end']['term'];

                        row0.appendChild(col1_0);
                        row0.appendChild(col1_1);
                        row0.appendChild(col1_2);
                        row0.appendChild(col1_3);
                        table.appendChild(row0);
                    }
                }
            document.getElementById('sol').appendChild(div);
            countQ3 = 1;
            }).catch(errorMsg => { console.log(errorMsg); });
        }
    }
    q3Lance++;
}


function rel(){

    
    relationQ3 = document.getElementById("relation").value;           
    if(relationQ3 == "")
        document.getElementById("relation").placeholder = "Veuillez mettre une relation !";
    else{
        if(q3Lance > 0)
            document.getElementById("tab").remove();
        document.getElementById("relation").value = "";
        let div = document.createElement('div');
        div.className = "solution";
        let table = document.createElement('table');
        table.setAttribute('id', "tab");
        let row0 = document.createElement('tr');
        let col1_1 = document.createElement('td');
        col1_1.innerHTML = "Start";
        let col1_2 = document.createElement('td');
        col1_2.innerHTML = "Relation";
        let col1_3 = document.createElement('td');
        col1_3.innerHTML = "End";
        let col1_0 = document.createElement('td');
        col1_0.innerHTML = "";

        row0.appendChild(col1_0);
        row0.appendChild(col1_1);
        row0.appendChild(col1_2);
        row0.appendChild(col1_3);
        table.appendChild(row0);
        div.appendChild(table);
        
        fetch(urlRelation+relationQ3, { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {

            urlJson = string;
            for(i=0 ; i<string['edges'].length-1 ; i++){

                if((string['edges'][i]['start']['language'] == 'en' ||
                string['edges'][i]['start']['language'] == 'fr') &&
                (string['edges'][i]['end']['language'] == 'en' ||
                string['edges'][i]['end']['language'] == 'fr')){

                    row0 = document.createElement('tr');
                    col1_0 = document.createElement('td');
                    col1_0.innerHTML = countQ3;
                    countQ3++;
                    col1_1 = document.createElement('td');
                    col1_1.innerHTML = string['edges'][i]['start']['term'];
                    col1_2 = document.createElement('td');
                    col1_2.innerHTML = string['edges'][i]['rel']['label'];
                    col1_3 = document.createElement('td');
                    col1_3.innerHTML = string['edges'][i]['end']['term'];

                    row0.appendChild(col1_0);
                    row0.appendChild(col1_1);
                    row0.appendChild(col1_2);
                    row0.appendChild(col1_3);
                    table.appendChild(row0);
                }
            }
        document.getElementById('sol').appendChild(div);
        countQ3 = 1;
        }).catch(errorMsg => { console.log(errorMsg); });
    }
    q3Lance++;
}


function relStartEnd(){

    var mot = document.getElementById("relationStartEnd1").value;
    var rel = document.getElementById("relationStartEnd2").value;
    if(mot == "")
        document.getElementById("relationStartEnd1").placeholder = "Veuillez mettre un mot !";
    if(rel == "")
        document.getElementById("relationStartEnd2").placeholder = "Veuillez mettre une relation !";
    else{
        if(q3Lance > 0)
            document.getElementById("tab").remove();
        document.getElementById("relationStartEnd1").value = "";
        document.getElementById("relationStartEnd2").value = "";
        let div = document.createElement('div');
        div.className = "solution";
        let table = document.createElement('table');
        table.setAttribute('id', "tab");
        let row0 = document.createElement('tr');
        let col1_1 = document.createElement('td');
        col1_1.innerHTML = "Start";
        let col1_2 = document.createElement('td');
        col1_2.innerHTML = "Relation";
        let col1_3 = document.createElement('td');
        col1_3.innerHTML = "End";
        let col1_0 = document.createElement('td');
        col1_0.innerHTML = "";

        row0.appendChild(col1_0);
        row0.appendChild(col1_1);
        row0.appendChild(col1_2);
        row0.appendChild(col1_3);
        table.appendChild(row0);
        div.appendChild(table);
        
        for(j=0 ; j<2 ; j++){
            fetch(url[j]+mot, { method: 'GET' })
            .then(Result => Result.json())
            .then(string => {
                
                urlJson = string;
                for(i=0 ; i<string['edges'].length-1 ; i++){

                    if((string['edges'][i]['start']['language'] == 'en' ||
                    string['edges'][i]['start']['language'] == 'fr') &&
                    (string['edges'][i]['end']['language'] == 'en' ||
                    string['edges'][i]['end']['language'] == 'fr')){

                        if(rel === string['edges'][i]['rel']['label']){
                            row0 = document.createElement('tr');
                            col1_0 = document.createElement('td');
                            col1_0.innerHTML = countQ3;
                            countQ3++;
                            col1_1 = document.createElement('td');
                            col1_1.innerHTML = string['edges'][i]['start']['term'];
                            col1_2 = document.createElement('td');
                            col1_2.innerHTML = string['edges'][i]['rel']['label'];
                            col1_3 = document.createElement('td');
                            col1_3.innerHTML = string['edges'][i]['end']['term'];

                            row0.appendChild(col1_0);
                            row0.appendChild(col1_1);
                            row0.appendChild(col1_2);
                            row0.appendChild(col1_3);
                            table.appendChild(row0);
                        }
                    }
                }
            document.getElementById('sol').appendChild(div);
            countQ3 = 1;
            }).catch(errorMsg => { console.log(errorMsg); });
        }
    } 
    q3Lance++;
}