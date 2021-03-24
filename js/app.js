'use strict';

let page1Horns = [];
let page2Horns = [];
let selectedPageName;
let pageHorns = page1Horns;
let Horn = function(horn) {
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.image_url = horn.image_url;
    this.horns = horn.horns;
}
Horn.prototype.renderHorn = function() {
    let template = $("#horn-template").html();
    console.log(template);
    let html = Mustache.render(template, this);
    $("main").append(html);
    // $('main').append(`
    //     <section class="photo-template">
    //         <h2>${this.title}</h2>
    //         <img src="${this.image_url}" alt="">
    //         <p>${this.description}</p>  
    //     </section>
    // `);
};

$(document).ready(function() {
    renderPage('page-1');

    // show the selected page
    $("nav").on('click', (event) => {
        event.preventDefault();

        if ($(event.target).text() === 'page 1') {
            selectedPageName = 'page 1';
            page1Horns = [];
            renderPage('page-1');
            pageHorns = page1Horns;
        } else if ($(event.target).text() === 'page 2') {
            selectedPageName = 'page 2';
            page2Horns = [];
            renderPage('page-2');
            pageHorns = page2Horns;
        }
    });

    // filter the content based on the selected keyword
    $('select').on('change', () => {
        $('main').text("");
        let selectedVal = $(this).find(':selected').val();
        console.log(pageHorns.length);
        pageHorns.forEach((horn) => {
            if (selectedVal == 'default') {
                (new Horn(horn)).renderHorn();
            } else if (horn.keyword == selectedVal) {
                (new Horn(horn)).renderHorn();
            }
        });
    });

});

// render the selected page
function renderPage(pageName) {
    $('main').text("");
    $('select').text("");

    // ajax setting 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json',
    };

    // getting data from JSON 
    $.ajax(`data/${pageName}.json`, ajaxSettings).then((data) => {
        data.forEach((horn) => {
            let hornObject = new Horn(horn);
            pageHorns.push(hornObject);
            hornObject.renderHorn();
        });
        renderKeywords();
    });
}
// render the keywords list
function renderKeywords() {
    const tempArr = [];
    $('select').append(`<option value="default">Filter by Keyword</option>`);
    pageHorns.forEach((horn) => {
        if (!tempArr.includes(horn.keyword)) {
            tempArr.push(horn.keyword);
            $('select').append(`<option value=${horn.keyword}>${horn.keyword}</option>`);
        }
    });
}