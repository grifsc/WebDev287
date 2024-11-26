function loadHomePageInfo(){
    fetch('/home-page-info/1')
        .then(response => response.json())
        .then(data => {
            document.getElementById('name').value = data.name;
            document.getElementById('logo').src = data.logo;
            document.getElementById('welcome').value = data.welcome;
            document.getElementById('hook').value = data.hook;
            document.getElementById('welcome-background').src = data.backgroundImg;
            document.getElementById('benefit-title').value = data.why;
            document.getElementById('benefit-1').value = data.reason1;
            document.getElementById('benefit-2').value = data.reason2;
            document.getElementById('benefit-3').value = data.reason3;
            document.getElementById('benefit-4').value = data.reason4;
            document.getElementById('benefit-description-1').value = data.description1;
            document.getElementById('benefit-description-2').value = data.description2;
            document.getElementById('benefit-description-3').value = data.description3;
            document.getElementById('benefit-description-4').value = data.description4;
            document.getElementById('slideshow-1').src = data.slide1;
            document.getElementById('slideshow-2').src = data.slide2;
            document.getElementById('slideshow-3').src = data.slide3;
            document.getElementById('slideshow-4').src = data.slide4;
            document.getElementById('caption-1').value = data.caption1;
            document.getElementById('caption-2').value = data.caption2;
            document.getElementById('caption-3').value = data.caption3;
            document.getElementById('caption-4').value = data.caption4;

        }).catch(error => console.error('Error loading all the home page information'));

    
}

function saveHomePageInfo(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const logoFile = document.getElementById('logo').files[0];
    const welcome = document.getElementById('welcome').value;
    const hook = document.getElementById('hook').value;
    const why = document.getElementById('benefit-title').value;
    const backgroundFile = document.getElementById('welcome-background').files[0];
    const reason1 = document.getElementById('benefit-1').value;
    const reason2 = document.getElementById('benefit-2').value;
    const reason3 = document.getElementById('benefit-3').value;
    const reason4 = document.getElementById('benefit-4').value;
    const description1 = document.getElementById('benefit-description-1').value;
    const description2 = document.getElementById('benefit-description-2').value;
    const description3 = document.getElementById('benefit-description-3').value;
    const description4 = document.getElementById('benefit-description-4').value;
    const slideFile1 = document.getElementById('slideshow-1').files[0];
    const slideFile2 = document.getElementById('slideshow-2').files[0];
    const slideFile3 = document.getElementById('slideshow-3').files[0];
    const slideFile4 = document.getElementById('slideshow-4').files[0];
    const caption1 = document.getElementById('caption-1').value;
    const caption2 = document.getElementById('caption-2').value;
    const caption3 = document.getElementById('caption-3').value;
    const caption4 = document.getElementById('caption-4').value;

    //Force the image path
    const logo = logoFile ? '/images/' + logoFile.name : '';
    const backgroundImg = backgroundFile ? '/images/' + backgroundFile.name : '';
    const slide1 = slideFile1 ? '/images/' + slideFile1.name : '';
    const slide2 = slideFile2 ? '/images/' + slideFile2.name : '';
    const slide3 = slideFile3 ? '/images/' + slideFile3.name : '';
    const slide4 = slideFile4 ? '/images/' + slideFile4.name : '';


    const data = {
        id : 1,
        name,
        logo,
        welcome,
        hook,
        why,
        reason1,
        description1,
        reason2,
        description2,
        reason3,
        description3,
        reason4,
        description4,
        backgroundImg,
        slide1,
        slide2,
        slide3,
        slide4,
        caption1,
        caption2,
        caption3,
        caption4
    };

    fetch('/edit-home-page', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            loadHomePageInfo();
            alert('Home Page saved successfully');
        } else {
            alert('Error saving Home Page');
        }
    })
    .catch(error => console.error('Error saving Home Page:', error));
}

function loadContactInfo(){
    fetch('/contact-info/1')
        .then(response => response.json())
        .then(data => {
            //Set all the input value to the one stored in the DB
            document.getElementById('contact-description').value = data.description;
            document.getElementById('email').value = data.email;
            document.getElementById('phone').value = data.phone;
            document.getElementById('address').value = data.address;
            document.getElementById('city').value = data.city;
            document.getElementById('state').value = data.state;
            document.getElementById('zip').value = data.zipcode;

        }).catch(error => console.error('Error loading all the contact information'));
}

function saveContactInfo(event){
    event.preventDefault();

    const description = document.getElementById('contact-description').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zip').value;

    const data = {
        id : 1,
        description,
        email,
        phone,
        address,
        city,
        state,
        zipcode
    };

    fetch('/edit-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            loadContactInfo();
            alert('Contact Page saved successfully');
        } else {
            alert('Error saving Contact Page');
        }
    })
    .catch(error => console.error('Error saving Contact Page:', error));
}

function loadFooterInfo(){
    fetch('/footer-info/1')
    .then(response => response.json())
    .then(data => {
        document.getElementById('about-us-description').value = data.aboutUs;
        document.getElementById('facebook-acc').value = data.facebook;
        document.getElementById('instagram-acc').value = data.instagram;
        document.getElementById('twitter-acc').value = data.twitter;

    }).catch(error => console.error('Error loading all the footer information'));
}

function saveFooterInfo(event){
    event.preventDefault();

    const aboutUs = document.getElementById('about-us-description').value ;
    const facebook = document.getElementById('facebook-acc').value;
    const instagram = document.getElementById('instagram-acc').value;
    const twitter = document.getElementById('twitter-acc').value;

    const data = {
        id : 1,
        aboutUs,
        facebook,
        instagram,
        twitter
    }

    fetch('/edit-footer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            loadFooterInfo();
            alert('Footer saved successfully');
        } else {
            alert('Error saving Footer');
        }
    })
    .catch(error => console.error('Error saving Footer:', error));
}

//Initialize the page
window.onload = function() {
    loadHomePageInfo();
    loadContactInfo();
    loadFooterInfo();
};

//Attach event listener to the save button
document.getElementById('save-home-page').addEventListener('click', saveHomePageInfo);
document.getElementById('save-contact').addEventListener('click', saveContactInfo);
document.getElementById('save-footer').addEventListener('click', saveFooterInfo);

//Attach event listener to the client's view button
document.getElementById('client-view-home').addEventListener('click', () => {window.open('/html/home.html', '_blank')});
document.getElementById('client-view-contact').addEventListener('click', () => {window.open('/html/contact.html', '_blank')});
document.getElementById('client-view-footer').addEventListener('click', () => {window.open('/html/home.html', '_blank')});