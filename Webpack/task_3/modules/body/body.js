import { $ } from 'jquery';
import debounce from 'lodash/debounce';
import './body.css';

$('body').append('<button>Click here to get started</button>');
$('body').append("<p id='count'></p>");

let count = 0;

function updateCounter() {
    count += 1;
    $('#count').text(`${count} clicks on the button`);
}

$('button').on('click', debounce(updateCounter, 500));
