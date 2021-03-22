'use strict';

const horns = [];

const Horn = function(horn) {
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.image_url = horn.image_url;
    this.horns = horn.horns;
};

Horn.prototype.renderHorn = function() {
    $('main').append(`
        <section class="photo-template">
            <h2>${this.title}</h2>
            <img src="${this.image_url}" alt="">
            <p>${this.description}</p>  
        </section>
    `);
};

$(function() {
    // ajax setting 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json',
    };

    // getting data from JSON 
    $.ajax('data/page-1.json', ajaxSettings).then((data) => {
        data.forEach((horn) => {
            let hornObject = new Horn(horn);
            horns.push(hornObject);
            hornObject.renderHorn();
        });
        renderKeywords();
    });

    // filter the content based on the selected keyword
    $('select').on('change', () => {
        $('main').text("");
        let selectedVal = $(this).find(':selected').val();
        horns.forEach((horn) => {
            if (selectedVal == 'default') {
                new Horn(horn).renderHorn();
            } else if (selectedVal == horn.keyword) {
                new Horn(horn).renderHorn();
            };
        });
    });
});


// render the keywords list
function renderKeywords() {
    const tempArr = [];
    horns.forEach((horn) => {
        if (!tempArr.includes(horn.keyword)) {
            tempArr.push(horn.keyword);
            $('select').append(`<option value=${horn.keyword}>${horn.keyword}</option>`)
        };
    });
}

console.log(horns);