var questions=[
    "Quel est le principal organe de stockage des nutriments dans le corps humain ?", 
    "Quel est le nom de la molécule responsable du stockage et de la transmission de l'information génétique ?",
    "Quel est l'organe responsable de la production d'insuline dans le corps humain ?",
    "Quel est l'organe principal du système respiratoire chez les humains ?",
    "Quel est l'élément chimique principal constituant les os ?",
    "Quel est l'organe responsable de la production de la bile ?",
    "Quel est le nom de l'organe responsable de la digestion des aliments dans le système digestif ?",
    "Quelle est l'unité de base de l'hérédité ?",
    "Quel organe est responsable de la filtration du sang et de l'élimination des déchets sous forme d'urine ?",
    " Quel est le nom de la structure cellulaire responsable de la synthèse des protéines ?"
];
var repenses = [
    "Le foie",
    "ADN",
    "Le pancréas",
    "Poumon",
    "Calcium",
    "Le foie",
    "Estomac",
    "Le gène",
    "Rein",
    "Ribosome"
];

var container = document.getElementById('repense');
function genererMotAleatoire(lettresSpecifiques) {
    var toutesLettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var mot = '';

    for (var i = 0; i < 4; i++) {
        var lettreAleatoire = toutesLettres.charAt(Math.floor(Math.random() * toutesLettres.length));
        mot += lettreAleatoire;
    }
    for (var i = 0; i < lettresSpecifiques.length; i++){
        if(lettresSpecifiques[i]!=' '){
            mot+=lettresSpecifiques[i];
        }
    }
    
    var motMelange = mot.split('').sort(function() { return 0.5 - Math.random() }).join('');

    return motMelange;
}
function clavierEtRepense(){
        var repense = repenses[compteur].toUpperCase();
        var h1 = document.querySelector('#question h2');
        
        h1.textContent=questions[compteur];
        for (var i = 0; i < repense.length; i++) {
            if(repense[i]==' '){
                var newDiv = document.createElement('div');
                newDiv.classList.add('espace');
                newDiv.textContent=" ";
                container.appendChild(newDiv);
            }else{
                var newDiv = document.createElement('div');
                newDiv.classList.add('letter');
                newDiv.addEventListener("click", function() {
                    var boutonsLettres = document.querySelectorAll('button.lettre');
                    var lettre = this.textContent;
                    if(lettre !=''){
                        this.textContent = '';
                    }
                    for (var j = 0; j < boutonsLettres.length; j++){
                        if(boutonsLettres[j].textContent === lettre && boutonsLettres[j].style.opacity === '0'){
                            boutonsLettres[j].style.opacity = '1';
                            break;
                        }
                    }
                });
                container.appendChild(newDiv);
            }
        }
        var motRegenere = genererMotAleatoire(repense);
        var divsLettres = document.querySelectorAll('.letter');
        var divIndex = 0;
        for(var i = 0; i < motRegenere.length; i++){
            var bouton = document.createElement("button");
            bouton.textContent = motRegenere[i];
            bouton.classList.add("btn", "btn-warning", "lettre");
            bouton.addEventListener("click", function() {
                var lettre = this.textContent;
                for(var j = 0; j < divsLettres.length; j++){
                    if(divsLettres[j].textContent === ''){
                        divsLettres[j].textContent = lettre;
                        this.style.opacity = 0;
                        break;
                    }
                }
            });
            var conteneur = document.getElementById("clavier");
            conteneur.appendChild(bouton);
        }
}

var compteur = 0;

document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.getElementById("startButton");
    var pageStart = document.getElementById("pageStart");
    var pageQuiz = document.getElementById("pageQuiz");

    startButton.addEventListener("click", function() {
        pageStart.style.display = "none"; 
        pageQuiz.style.display = "block"; 
        
    
        clavierEtRepense();
    });
});

function supprimerChild(balise, parent){
    var childs = parent.querySelectorAll(balise);
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        child.parentNode.removeChild(child);
    }
}
function nextquestion() {
    var enfants = container.childNodes;
    var tab =[];
    for (var i = 0; i < enfants.length; i++) {
        var enfant = enfants[i].textContent;
        tab.push(enfant);
        
    }
    var mot = tab.join('');
    if(mot.trim().length === repenses[compteur].trim().length){
        var question = document.querySelector('.question em');
        var score = document.querySelector('.score em');
        var image = document.querySelector('.container .dislike');
        var nbr = compteur+2;
        if(repenses[compteur].toUpperCase().trim() === mot.trim()){
            var valeur = parseInt(score.innerText);
            score.innerText=valeur+10;
            var image = document.querySelector('.container .bravo');
            image.style.display = "block";
            image.classList.add('blinking'); 
            image.addEventListener('animationend', function() {
                if(nbr<11){
                    question.innerText = "Question "+nbr;
                    image.style.display = "none";
                    var parent1 = document.getElementById('repense');
                    var parent2 = document.getElementById('clavier');
                    supprimerChild('div', parent1);
                    supprimerChild('button', parent2);
                    clavierEtRepense();
                } else {
                    var endH1 = document.querySelector("#pageEnd h1");
                    var endH3 = document.querySelector("#pageEnd h3");
                    var gif1 = document.querySelector('#pageEnd .felicitation');
                    var gif2 = document.querySelector('#pageEnd .triste');
                    var pageEnd = document.getElementById("pageEnd");
                    pageEnd.style.display = 'block';
                    var pageQuiz = document.getElementById("pageQuiz");
                    pageQuiz.style.display = 'none';

                    if (parseInt(score.innerText) > 30) {
                        endH1.textContent = 'Félicitation!!';
                        endH3.textContent = 'vous avez gagné ' + score.innerText + '$';
                        gif1.style.display = 'block';
                    } else {
                        endH1.textContent = 'Non!!';
                        endH3.textContent = 'vous avez seulement ' + score.innerText + '$';
                        gif2.style.display = 'block';
                    }
                }
            }, { once: true });
            
        }else{
            var image = document.querySelector('.container .dislike');
            image.style.display = "block";
            image.classList.add('blinking'); 
            image.addEventListener('animationend', function() {
                if(nbr<11){
                    question.innerText = "Question "+nbr;
                    image.style.display = "none";
                    var parent1 = document.getElementById('repense');
                    var parent2 = document.getElementById('clavier');
                    supprimerChild('div', parent1);
                    supprimerChild('button', parent2);
                    clavierEtRepense();
                } else {
                    var endH1 = document.querySelector("#pageEnd h1");
                    var endH3 = document.querySelector("#pageEnd h3");
                    var gif1 = document.querySelector('#pageEnd .felicitation');
                    var gif2 = document.querySelector('#pageEnd .triste');
                    var pageEnd = document.getElementById("pageEnd");
                    pageEnd.style.display = 'block';
                    var pageQuiz = document.getElementById("pageQuiz");
                    pageQuiz.style.display = 'none';

                    if (parseInt(score.innerText) > 30) {
                        endH1.textContent = 'Félicitation!!';
                        endH3.textContent = 'vous avez gagné ' + score.innerText + '$';
                        gif1.style.display = 'block';
                    } else {
                        endH1.textContent = 'Je suis triste!!';
                        endH3.textContent = 'Vous avez seulement ' + score.innerText + '$ !!';
                        gif2.style.display = 'block';
                    }
                }
            }, { once: true });
        }
        compteur++;
    }else{
        document.querySelector('.alert').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.alert').style.display = 'none';
          }, 5000);
    }
    
}