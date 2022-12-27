/**
 * Variables
 */


// Informations du client
var title;              // Civilité
var firstName;          // Prénom
var lastName;           // Nom
var email;              // Adresse mail
var phoneNum;           // N° de téléphone
var address;            // Adresse postale
var zipCode;            // Code postal
var city;               // Ville

// Informations de l'animal
var petName;            // Nom
var petSpecies;         // Espèce
var petGender;          // Sexe
var petBreed;           // Race
var petIdentif;         // Transpondeur
var petTatoo            // Tatouage
var petAge;             // Age

// Eléments divers de la page
var loader;
var container = document.querySelector('[data-test="detail-info-1"]');
var button;
var script;
var invoice;
var prescription;


/**
 * Fonctions
 */


// Récupère le contenu des champs de la page
function getInfos() {
    title = document.getElementsByName('client.title')[0].value;
    firstName = document.getElementsByName('client.firstname')[0].value;
    lastName = document.getElementsByName('client.lastname')[0].value;
    email = document.getElementsByName('client.email')[0].value;
    phoneNum = document.getElementsByName('clientPhone.number')[0].value;
    address = document.getElementsByName('clientAddress.address')[0].value;
    zipCode = document.getElementsByName('clientAddress.zipCode')[0].value;
    city = document.getElementsByName('clientAddress.city')[0].value;
    petName = document.getElementsByName('patient.name')[0].value;
    var petSpeciesId = document.getElementsByName('species.id')[0].value;
    var petGenderId = document.getElementsByName('gender.id')[0].value;
    petSpecies = getPetSpecies(petSpeciesId, petGenderId);
    petBreed = document.getElementsByName('patient.breed')[0].value;
    petIdentif = document.getElementsByName('patient.identification')[0].value;
    petTatoo = document.getElementsByName('patient.tatoo')[0].value;
    petAge = document.getElementsByName('patient.age')[0].value;
}

// Attend que les informations soient disponibles
function waitInfos() {
    return new Promise(function (resolve, reject) {(
        function waitForInfos() {
            if (
                document.getElementById('extendedClientPanel').style.display != 'none' &&   // Uniquement si les onglets sont visibles
                document.getElementsByName('species.id')[0].value &&
                document.getElementsByName('gender.id')[0].value
            ) {
                return resolve();
            }
            setTimeout(waitForInfos, 100);
        }) ();
    });
}

// Reformate les données récupérées
function formatInfos() {
    title = title.replace(/(\r\n|\n|\r)/gm, "");
    firstName = firstName.replace(/(\r\n|\n|\r)/gm, "");
    lastName = lastName.replace(/(\r\n|\n|\r)/gm, "");
    email = email.replace(/(\r\n|\n|\r)/gm, "");
    phoneNum = phoneNum.replace(/(\r\n|\n|\r)/gm, "");
    address = address.replace(/(\r\n|\n|\r)/gm, "");
    zipCode = zipCode.replace(/(\r\n|\n|\r)/gm, "");
    city = city.replace(/(\r\n|\n|\r)/gm, "");
    petName = petName.replace(/(\r\n|\n|\r)/gm, "");
    petSpecies = petSpecies.replace(/(\r\n|\n|\r)/gm, "");
    petBreed = petBreed.replace(/(\r\n|\n|\r)/gm, "");
    petIdentif = petIdentif.replace(/(\r\n|\n|\r)/gm, "");
    petTatoo = petTatoo.replace(/(\r\n|\n|\r)/gm, "");
    petAge = petAge.replace(/(\r\n|\n|\r)/gm, "");
}

// Reformate les données qui sont vides
function formatEmpty() {
    if (title.length == 0) { title = 'M' };
    if (firstName.length == 0) { firstName = 'Inconnu' };
    if (lastName.length == 0) { lastName = 'INCONNU' };
    if (email.length == 0) { email = 'exemple@mail.com' };
    if (phoneNum.length == 0) { phoneNum = '0000000000' };
    if (address.length == 0) { address = 'Inconnu' };
    if (zipCode.length == 0) { zipCode = '00000' };
    if (city.length == 0) { city = 'Inconnu' };
    if (petName.length == 0) { petName = 'INCONNU' };
    if (petSpecies.length == 0) { petSpecies = 'Animal' };
    if (petBreed.length == 0) { petBreed = 'Race non-renseignée' };
    //if (petIdentif.length == 0) { petIdentif = 'XXXXXXXXXXXXXXX' };
    //if (petTatoo.length == 0) { petTatoo = 'XXXXXX' };
    if (petAge.length == 0) { petAge = '01/01/2000' };
}

// Récupère l'espèce de l'animal en fonction de son genre
function getPetSpecies(petSpeciesId, petGenderId) {
    if (petSpeciesId == 1) {
        if (petGenderId == 1 || petGenderId == 3) {
            return 'le chien';
        }
        else if (petGenderId == 2 || petGenderId == 4) {
            return 'la chienne';
        }
    }
    else if (petSpeciesId == 2) {
        if (petGenderId == 1 || petGenderId == 3) {
            return 'le chat';
        }
        else if (petGenderId == 2 || petGenderId == 4) {
            return 'la chatte';
        }
    }
    else {
        return 'l\'animal';
    }
}

// Récupère l'identification de l'animal
function getPetIdentif() {
    if (!petIdentif == '') {
        return petIdentif;
    }
    else if (!petTatoo == '') {
        return petTatoo;
    }
    else if (!petAge == '') {
        return 'Né le ' + petAge;
    }
    else {
        return 'Aucune identification';
    }
}

// Affiche le texte de chargement
function addLoader() {
    loader = document.createElement('span');
    loader.setAttribute('id', 'loader');
    loader.setAttribute('name', 'loader');
    loader.setAttribute('style', 'display: block; margin: 8px; margin-left: 105px; color: #505050; font-weight: bold;');
    loader.innerHTML = "Chargement...";
    container.appendChild(loader);
}

// Affiche le message de raffraichissement
function addWarning() {
    loader = document.createElement('span');
    loader.setAttribute('id', 'warning');
    loader.setAttribute('name', 'warning');
    loader.setAttribute('style', 'display: block; margin: 8px; margin-left: 105px; color: #505050; font-weight: bold;');
    loader.innerHTML = "Pour exporter les informations, il est nécessaire de raffraichir la page (F5)";
    container.appendChild(loader);
}

// Affiche le texte d'erreur
function addError() {
    loader = document.createElement('span');
    loader.setAttribute('id', 'error');
    loader.setAttribute('name', 'error');
    loader.setAttribute('style', 'display: block; margin: 8px; margin-left: 105px; color: #fa0000; font-weight: bold;');
    loader.innerHTML = "Impossible de charger l'extension GmVET Data Catcher";
    container.appendChild(loader);
}

// Intègre le bouton d'exporation à la page
function addButton() {
    button = document.createElement('button');
    button.setAttribute('id', 'export');
    button.setAttribute('name', 'export');
    button.setAttribute('class', 'btn-darkGrey');
    button.setAttribute('style', 'margin: 8px; margin-left: 105px;');
    button.setAttribute('onClick', 'displayData();');
    button.innerHTML = "Exporter les informations";
    container.appendChild(button);
}

// Intègre le champ de texte pour la facture à la page
function addInvoice() {
    invoice = document.createElement('textarea');
    invoice.setAttribute('id', 'invoice');
    invoice.setAttribute('name', 'invoice');
    invoice.setAttribute('style', 'display: none;');
    invoice.value = "Aucune information à afficher.";
    container.appendChild(invoice);
}

// Intègre le champ de texte pour l'ordonnance à la page
function addPrescription() {
    prescription = document.createElement('textarea');
    prescription.setAttribute('id', 'prescription');
    prescription.setAttribute('name', 'prescription');
    prescription.setAttribute('style', 'display: none;');
    prescription.value = "Aucune information à afficher.";
    container.appendChild(prescription);
}

// Injecte le script d'affichage des informations
function injectScript() {
    script = document.createElement('script');
    script.type = 'text/javascript';
    var code = "var invoice;\nvar prescription;\n" + 
        "function displayData() {"
        + "invoice = document.getElementById(\"invoice\");"
        + "prescription = document.getElementById(\"prescription\");"
        + "invoice.setAttribute(\"style\", \"display: block; margin-left: 105px; margin-bottom: 8px; width: 100%; height: 100px;\");"
        + "prescription.setAttribute(\"style\", \"display: block; margin-left: 105px; margin-bottom: 8px; width: 100%; height: 60px;\");"
        + "invoice.value = \"" + title + " " + lastName + " " + firstName + "\\n"+ address + "\\n" + zipCode + " " + city + "\\n\\nPour " + petSpecies + " " + petName.toUpperCase() + " / " + petBreed + " / " + getPetIdentif() + "\";"
        + "prescription.value = \"Pour " + petSpecies + " " + petName.toUpperCase() + " / " + petBreed + " / " + getPetIdentif() + "\\n" + title + " " + lastName + " " + firstName + " " + zipCode + " " + city + "\"};\n";
    script.appendChild(document.createTextNode(code));
    container.appendChild(script);
}


/**
 * Script
 */


// Exécution du script
window.addEventListener("load", function () {
    if (window.location.href.indexOf('medicalpatient') > -1) {
        try {
            addLoader();
            waitInfos().then(function() {
                getInfos();         // On récupère les informations de la page
                formatInfos();      // On les formattent avant de les afficher
                formatEmpty();      // On remplace tous les champs vides
                loader.remove();    // On enlève le label "Chargement..."
                addButton();        // On ajoute le bouton d'export des données
                addInvoice();       // On ajoute le champ du texte pour la facture
                addPrescription();  // On ajoute le champ du texte pour l'ordonnace
                injectScript();     // On injecte le script d'affichage sur la page
                console.log('[GmVET Data Catcher] Successfully loaded.');
            });
        }
        catch (error) {
            console.error(error);
            addError();
            console.log('[GmVET Data Catcher] An error occured.');
        }
        finally {
            console.log('[GmVET Data Catcher] Script has finished.');
        }
    }
    else {
        addWarning();
    }
});
