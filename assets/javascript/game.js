warriorOfLight = {
  heroBaseAtk: 0,
  heroAtk: 0,
  elHeroAtk: [],
  monsterMaxHP:0,
  monsterHP:0,
  elMonsterHP:[],
  currentXP: [],
  levelUpXP: [5, 10, 20, 40, 80, 160, 320, 640, 1280],
  currentLV: [],
  currentHP: [],
  maxHP: [],

  hero: {
    sora: {
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 8,
        baseMag: 8,
        baseHP: 250
      }
    },

    donald: {
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 2,
        baseMag: 12,
        baseHP: 150
      }
    },

    riku: {
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 15,
        baseMag: 2,
        baseHP: 200
      }
    }
  },

  monster: {
    phantom: {
      stat: {
        baseAtk: 5,
        baseHP: 100
      }
    }
  },

  isGuarding: false,
  heroSelected: false,
  monsterSelected: false,
  inCombat: false,
  inPeace: true,
  gameStart: false,
  gameFinish: false,

  /* Hide De-select button */
  initialize: function() {
    $("#deSelectSora").hide();
    $("#deSelectDonald").hide();
    $("#deSelectRiku").hide();
    $("#deSelectPhantom").hide();
  }
  /* Hide De-select button */
};

$(document).ready(function() {
  warriorOfLight.initialize();

  /* Select Heroes */
  $("#selectSora").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;
      warriorOfLight.elHeroAtk = $("#soraCard #attack");
      warriorOfLight.heroBaseAtk = warriorOfLight.hero.sora.stat.baseAtk;
      $(this).hide(0);
      $("#deSelectSora").show(0);
      $("#soraCard").prependTo($("#fightArena"));
      $("#heroCard").appendTo($("#heroList"));
    }
  });
  $("#selectDonald").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;
      $(this).hide(0);
      $("#deSelectDonald").show(0);
      $("#donaldCard").prependTo($("#fightArena"));
      $("#heroCard").appendTo($("#heroList"));
    }
  });
  $("#selectRiku").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;
      $(this).hide(0);
      $("#deSelectRiku").show(0);
      $("#rikuCard").prependTo($("#fightArena"));
      $("#heroCard").appendTo($("#heroList"));
    }
  });
  /* Select Heroes */

  /* De-select Heroes */
  $("#deSelectSora").on("click", function() {
    if (warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = false;
      $(this).hide(0);
      $("#selectSora").show(0);
      $("#soraCard").prependTo($("#heroList"));
      $("#heroCard").appendTo($("#fightArena"));
    }
  });
  $("#deSelectDonald").on("click", function() {
    if (warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = false;
      $(this).hide(0);
      $("#selectDonald").show(0);
      $("#donaldCard").prependTo($("#heroList"));
      $("#heroCard").appendTo($("#fightArena"));
    }
  });

  $("#deSelectRiku").on("click", function() {
    if (warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = false;
      $(this).hide(0);
      $("#selectRiku").show(0);
      $("#rikuCard").prependTo($("#heroList"));
      $("#heroCard").appendTo($("#fightArena"));
    }
  });
  /* De-select Heroes */

  /* Select Monsters */
  $("#selectPhantom").on("click", function() {
    if (!warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = true;

      warriorOfLight.elMonsterHP = $("#phantomCard #hp");
      warriorOfLight.monsterHP = warriorOfLight.monster.phantom.stat.baseHP;

      $(this).hide(0);
      $("#deSelectPhantom").show(0);
      $("#phantomCard").appendTo($("#fightArena"));
      $("#monsterCard").appendTo($("#monsterList"));
    }
  });
  /* Select Monsters */

  /* De-select Monsters */
  $("#deSelectPhantom").on("click", function() {
    if (warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = false;
      $(this).hide(0);
      $("#selectPhantom").show(0);
      $("#phantomCard").prependTo($("#monsterList"));
      $("#monsterCard").appendTo($("#fightArena"));
    }
  });
  /* De-select Monsters */

  /* One-time hero selection */
  $("#atkBtn").on("click", function() {
    if (!warriorOfLight.gameStart) {
      if (!warriorOfLight.heroSelected && !warriorOfLight.monsterSelected) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "Please select your Light Champion and pick a Monster to fight" +
            "</div>"
        );
      } else if (!warriorOfLight.heroSelected) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "Please select your Light Champion" +
            "</div>"
        );
      } else if (!warriorOfLight.monsterSelected) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "Please pick a Monster to fight" +
            "</div>"
        );
      } else {
        warriorOfLight.gameStart = true;
        warriorOfLight.inCombat = true;
        $(".heroSelectBtn").remove();
        $(".monsterSelectBtn").hide();
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "The game has begun, have fun!" +
            "</div>"
        );
      }
    }
  });
  /* One-time hero selection */

  /* Combat */
  $("#atkBtn").on("click", function() {
    if (warriorOfLight.gameStart && warriorOfLight.inCombat) {
        warriorOfLight.heroAtk = warriorOfLight.heroAtk + warriorOfLight.heroBaseAtk;
        warriorOfLight.monsterHP = warriorOfLight.monsterHP - warriorOfLight.heroAtk;
        warriorOfLight.elHeroAtk.text(warriorOfLight.heroAtk);
        warriorOfLight.elMonsterHP.text(warriorOfLight.monsterHP);
    }
  });
  /* Combat */
});

/* $("#logs").prepend("<div>" + $("#logs div").length + ". " + "Please select your Light Champion and pick a Monster to fight" + "</div>"); */
