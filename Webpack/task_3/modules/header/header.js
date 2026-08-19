import { $ } from 'jquery';
import './header.css';

$('body').prepend(`
    <header id="logo"></header>
    <h1>Holberton Dashboard</h1>
    `);
    console.log('Init header');
