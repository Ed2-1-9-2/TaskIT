// JavaScript pentru calendar
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const dataInput = document.getElementById('data');
const nav = document.querySelector('.nav');

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    }
    
    function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    }
