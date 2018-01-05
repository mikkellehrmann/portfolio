var erDerKlikketPaaAlleKnapperFlag = false;
var antalKlik = 0;
var firstTime = true;

$(window).on("load", startHistorie);

function startHistorie() {
    console.log("startHistorie");

    $("#titel_container").removeClass("titel_start_pos");
    $("#titel_container").addClass("titel_ned");
}

/*******************************/


$("#clickable").on("click", titelBtnHandler);

function titelBtnHandler() {
    console.log("titelBtnHandler");

    $("#titel_container").removeClass("titel_ned");
    $("#titel_container").addClass("titel_slut_pos");
    $("#baggrund_melodi")[0].play();
    $("#baggrund_melodi")[0].volume = 0;
    $("#baggrund_melodi").animate({
        volume: .4
    }, 3000);


    $("#titel_container").on("animationend", lynStart);
}

/*******************************/

function lynStart() {
    console.log("lynStart");

    $("#titel_container").off("animationend", lynStart);

    $("#lyn_container").removeClass("lyn_start_pos");
    $("#lyn_lyd")[0].play();
    $("#lyn_container").addClass("lyn_cycle");

    $("#lyn_container").on("animationend", slimeIn);
}


/*******************************/

function slimeIn() {
    console.log("slimeIn");
    $("#lyn_container").off("animationend", lynStart);

    $("#lyn_container").removeClass("lyn_cycle");
    $("#slime_container").removeClass("slime_start_pos");

    $("#slime_god_lyd")[0].play();

    $("#slime_sprite").addClass("slime_walkcycle");
    $("#slime_container").addClass("slime_move_right");

    $("#slime_container").on("animationend", slimeHappy);
}


/*******************************/


function slimeHappy() {
    console.log("slimeHappy");

    $("#slime_container").off("animationend", slimeHappy);

    $("#slime_sprite").removeClass("slime_walkcycle");
    $("#slime_container").removeClass("slime_move_right");


    $("#slime_happy_lyd")[0].play();
    $("#slime_sprite").addClass("slime_happy_cycle");
    $("#slime_container").addClass("slime_happy_stand");

    $("#slime_container").on("animationend", valgBoks);
}

/*******************************/

function valgBoks() {
    console.log("valgBoks");

    $("#slime_container").off("animationend", valgBoks);
    $("#boble2_container").removeClass("boble2_start_pos");
    $("#boble_container").removeClass("boble_start_pos");

    $("#boble_container").addClass("boble_float");
    $("#textbob").addClass("show_font");
    $("#textbob2").addClass("show_font");
    $("#boble_sprite").addClass("boble_walkcycle");

    $("#boble2_container").addClass("boble2_float");
    $("#boble2_sprite").addClass("boble2_walkcycle");
}

/*******************************/
//Brugeren har valgt at blive
/*******************************/

$("#boble2_container").on("click", evilSlimeIn);

function evilSlimeIn() {
    console.log("evilSlimeIn");

    $("#slime_container").off("animationend", evilSlimeIn);

    $("#boble2_container").removeClass("boble2_float");
    $("#boble_container").removeClass("boble_float");

    $("#slime_sprite").removeClass("slime_happy_cycle");
    $("#evil_slime_container").removeClass("evil_slime_start_pos");
    $("#slime_sprite").removeClass("slime_happy_cycle");

    $("#boble2_container").addClass("boble2_start_pos");
    $("#boble_container").addClass("boble_start_pos");


    $("#evil_slime_container").addClass("evil_slime_move_right");
    $("#evil_slime_sprite").addClass("evil_slime_walkcycle");
    $("#slime_sprite").addClass("slime_scared_cycle");

    $("#slime_container").on("animationend", evilSlimeStand);
}

/*******************************/
//Brugeren har valgt at hoppe
/*******************************/

$("#boble_container").on("click", slimeJump);

function slimeJump() {
    console.log("slimeJump");

    $("#slime_container").off("animationend", slimeJump);

    $("#boble2_container").removeClass("boble2_float");
    $("#boble_container").removeClass("boble_float");

    $("#slime_sprite").removeClass("slime_happy_cycle");


    $("#slime_sprite").addClass("slime_prejump_sprite");
    $("#slime_container").addClass("slime_prejump");

    $("#boble2_container").addClass("boble2_start_pos");
    $("#boble_container").addClass("boble_start_pos");

    $("#slime_container").on("animationend", randomValg);
}

/*******************************/
//Tag et tilfældigt valg.
/*******************************/


function randomValg() {
    console.log("randomValg");

    $("#slime_container").off("animationend", randomValg);

    if (Math.random() >= 0.3) {
        console.log("true");
        tilJump();
    } else {
        console.log("false");
        jumpOver();
    }
}

/*******************************/
//Hjælp ham med at hoppe.
/*******************************/


function tilJump() {
    console.log("tilJump");
    $("#slime_container").off("animationend", randomValg);

    $("#slime_sprite").removeClass("");
    $("#slime_container").removeClass("slime_prejump");
    $("#slime_container").addClass("slime_prejump_ready");

    vedJump();

    //    $("#slime_container").on("animationend", vedJump);

}

function vedJump() {
    console.log("vedJump");
    $("#slime_container").off("animationend", vedJump);
    $("#slime_container").removeClass("slime_prejump_ready");


    $("#slime_container").addClass("slimeErKlar");

    $("#powerbar_container").removeClass("powerbar_start_pos");
    $("#btn_container").removeClass("btn_start_pos");

    $("#powerbar_container").addClass("powerbar_ind");
    $("#btn_container").addClass("btn_ind");

    $("#btn_container").on("click", klikPaaKnap);
    if (firstTime) {
        firstTime = false;
        setTimeout(saaErTidenErGaaet, 3000);
    }
}

function klikPaaKnap() {
    $("#btn_container").off("click", klikPaaKnap);

    antalKlik++;
    console.log("Klik på knap " + antalKlik);

    faerdig();

}

function saaErTidenErGaaet() {
    console.log("saaErTidenErGaaet");
    if (erDerKlikketPaaAlleKnapperFlag == false) {
        fallInLava();

        $("#btn_container").off("click", klikPaaKnap);
    }
}

function faerdig() {
    console.log("faerdig");
    $("#hundcontainer").off("animationend", faerdig);
    if (antalKlik >= 8) {
        erDerKlikketPaaAlleKnapperFlag = true;

        $("#powerbar_container").removeClass("powerbar_ind");
        $("#btn_container").removeClass("btn_ind");
        $("#powerbar_container").addClass("powerbar_start_pos");
        $("#btn_container").addClass("btn_start_pos");

        tilDenAndenSide();
    } else {

        if (antalKlik == 1) {
            console.log("Charge1");

            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite1");
        } else if (antalKlik == 2) {
            console.log("Charge2");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite2");

        } else if (antalKlik == 3) {
            console.log("Charge3");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite3");

        } else if (antalKlik == 4) {
            console.log("Charge4");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite4");

        } else if (antalKlik == 5) {
            console.log("Charge5");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite5");
        } else if (antalKlik == 6) {
            console.log("Charge6");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite6");

        } else if (antalKlik == 7) {
            console.log("Charge7");
            $("#powerbar_sprite").removeClass("");
            $("#powerbar_sprite").addClass("powerbar_sprite7");
        }
        vedJump();
    }
}

/*******************************/
// jumpOver
/*******************************/

function jumpOver() {
    console.log("jumpOver");

    $("#slime_sprite").removeClass("");
    $("#slime_container").removeClass("slime_prejump_ready");

    $("#slime_sprite").addClass("slime_jumpover_cycle");
    $("#slime_container").addClass("slime_jumpover");

    $("#slime_container").on("animationend", happySlime);

}

function fallInLava() {
    console.log("fallInLava");

    $("#powerbar_container").removeClass("powerbar_ind");
    $("#btn_container").removeClass("btn_ind");

    $("#powerbar_container").addClass("powerbar_start_pos");
    $("#btn_container").addClass("btn_start_pos");

    $("#slime_sprite").removeClass("");
    $("#slime_container").removeClass("slime_prejump_ready");

    $("#slime_sprite").addClass("slime_lava_cycle");
    $("#slime_container").addClass("slime_in_lava");

    setTimeout(replayScreen, 5000);

}




/*******************************/
// Slime hopper til den anden side uden problemer.
/*******************************/

function tilDenAndenSide() {
    console.log("tilDenAndenSide");

    $("#slime_sprite").removeClass("slime_prejump_sprite");
    $("#slime_container").removeClass("slime_prejump_ready");
    $("#slime_container").removeClass("slime_happy_stand");
    $("#slime_container").removeClass("slime_jump");
    $("#slime_container").removeClass("slimeErKlar");

    $("#slime_sprite").addClass("slime_jumpcycle");
    $("#slime_container").addClass("slime_jump");

    $("#slime_container").on("animationend", happySlime);
}

/*******************************/
// Slime er ankommet til den anden side, og er glad
/*******************************/

function happySlime() {
    console.log("happySlime");

    $("#slime_container").off("animationend", happySlime);

    $("#slime_sprite").removeClass("slime_jumpover_cycle");
    $("#slime_container").removeClass("slime_jumpover");

    $("#slime_happy_melodi")[0].play();
    $("#slime_sprite").addClass("slime_happy_jumpcycle");
    $("#slime_container").addClass("slime_happy_jump");

    setTimeout(replayScreen, 4000);

}

/*******************************/

function evilSlimeStand() {
    console.log("evilSlimeStand");
    $("#slime_sprite").off("animationend", evilSlimeStand);

    $("#slime_sprite").removeClass("slime_happy_cycle");

    $("#slime_sprite").addClass("slime_scared_cycle");
    $("#evil_slime_container").addClass("evil_slime_stand_pos");


    $("#evil_slime_stand_lyd")[0].play();

    $("#evil_slime_container").on("animationend", evilSlimeAttack);

}


function evilSlimeAttack() {
    console.log("evilSlimeAttack");
    $("#evil_slime_container").off("animationend", evilSlimeAttack);

    $("#evil_slime_container").removeClass("evil_slime_stand_pos");
    $("#evil_slime_sprite").removeClass("evil_slime_walkcycle");
    $("#slime_container").removeClass("slime_happy_stand");

    $("#fireball_lyd")[0].play();
    $("#evil_slime_stand_lyd")[0].pause();
    $("#slime_scream")[0].play();

    $("#evil_slime_sprite").addClass("evil_slime_attack");
    $("#slime_sprite").addClass("slime_scared_cycle");

    $("#fireball_sprite").addClass("fireball_walkcycle");
    $("#fireball_container").addClass("fireball_move_right");

    $("#slime_container").addClass("slime_hit");
    $("#slime_sprite").addClass("slime_hitcycle");


    setTimeout(replayScreen, 6000);
}

function replayScreen() {
    console.log("replayScreen");


    $("#evil_slime_stand_lyd")[0].pause();
    $("#slime_container").off("animationend", replayScreen);
    $("#replay").removeClass("replay_start_pos");
    $("#replay").addClass("replay_slut_pos");
}


/*******************************/

$("#replay_btn").on("click", replayButton);

function replayButton() {
    document.location.reload(true);

}
