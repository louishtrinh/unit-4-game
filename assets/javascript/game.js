warriorOfLight = {
  /* Hero Info */
  lightChampion: [],
  heroAtk: 0,
  heroHP: 0,
  heroMag: 0,
  heroXP: 0,
  heroLV: 1,
  heroAtkEl: [],
  heroHPel: [],
  heroMagEl: [],
  heroXPel: [],
  heroLVel: [],
  heroToBanish: [],
  /* Hero Info */

  /* Monster Info */
  darkMinion: [],
  monsterAtk: 0,
  monsterMag: 0,
  monsterHP: 0,
  monsterHPel: [],
  cardToBanish: [],
  /* Monster Info */

  score: 0,
  levelUpXP: [5, 10, 20, 40, 80, 160, 320, 640, 1280],

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
    },
    aqua: {
      stat: {
        baseAtk: 20,
        baseHP: 380
      }
    },
    xaldin: {
      stat: {
        baseAtk: 60,
        baseHP: 500
      }
    }
  },

  isGuarding: false,
  firstStart: true,
  heroSelected: false,
  monsterSelected: false,
  inCombat: false,

  /* Hide De-select button */
  initialize: function() {
    $("#deSelectSora").hide();
    $("#deSelectDonald").hide();
    $("#deSelectRiku").hide();
    $("#deSelectPhantom").hide();
    $("#deSelectAqua").hide();
    $("#deSelectXaldin").hide();
  },
  /* Hide De-select button */

  getHeroInfo: function() {
    this.heroAtk = this.lightChampion.stat.baseAtk;
    this.heroMag = this.lightChampion.stat.baseMag;
    this.heroHP = this.lightChampion.stat.baseHP;
    this.heroXP = this.lightChampion.stat.baseXP;
    this.heroLV = this.lightChampion.stat.baseLV;
  },

  getMonsterInfo: function() {
    this.monsterHP = this.darkMinion.stat.baseHP;
    this.monsterAtk = this.darkMinion.stat.baseAtk;
  },

  heroAttack: function() {
    this.monsterHP = this.monsterHP - this.heroAtk;
    $("#logs").prepend(
      "<div>" +
        $("#logs div").length +
        ". " +
        "Hero hits for " +
        this.heroAtk +
        " damage" +
        "</div>"
    );
    this.heroLV++;
    $("#logs").prepend(
      "<div>" +
        $("#logs div").length +
        ". " +
        "Level Up! ATK increase by " +
        this.lightChampion.stat.baseAtk +
        "." +
        "</div>"
    );
    this.heroAtk = this.heroAtk + this.lightChampion.stat.baseAtk;

    this.heroAtkEl.text(this.heroAtk);
    this.heroLVel.text(this.heroLV);
    this.monsterHPel.text(this.monsterHP);
  },

  monsterCounter: function () {
    this.heroHP = this.heroHP - this.monsterAtk;
    this.heroHPel.text(this.heroHP);
    $("#logs").prepend(
      "<div>" +
        $("#logs div").length +
        ". " +
        "Monster counters for " +
        this.darkMinion.stat.baseAtk +
        " damage" +
        "</div>"
    );
  },

  monsterBanish: function () {
    this.inCombat=false;
    this.score++;
    this.cardToBanish.remove();
    $(".monsterSelectBtn").show();
    this.initialize();
    $("#monsterCard").appendTo($("#fightArena"));
  }
};


/* $("#logs").prepend("<div>" +$("#logs div").length +". " +"Comment goes here" + "</div>"); */

$(document).ready(function() {
  warriorOfLight.initialize();

  /* Select Heroes */
  $("#selectSora").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;

      /* Remember hero pick to obj */
      warriorOfLight.lightChampion = warriorOfLight.hero.sora;

      /* Latch to page */
      warriorOfLight.heroToBanish = $("#soraCard");
      warriorOfLight.heroLVel = $("#soraCard #level");
      warriorOfLight.heroAtkEl = $("#soraCard #attack");
      warriorOfLight.heroHPel = $("#soraCard #hp");

      $(this).hide(0);
      $("#deSelectSora").show(0);
      $("#soraCard").prependTo($("#fightArena"));
      $("#heroCard").appendTo($("#heroList"));
    }
  });
  $("#selectDonald").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;

      /* Remember hero pick to obj */
      warriorOfLight.lightChampion = warriorOfLight.hero.donald;

      /* Latch to page */
      warriorOfLight.heroToBanish = $("#donaldCard");
      warriorOfLight.heroLVel = $("#donaldCard #level");
      warriorOfLight.heroAtkEl = $("#donaldCard #attack");
      warriorOfLight.heroHPel = $("#donaldCard #hp");

      $(this).hide(0);
      $("#deSelectDonald").show(0);
      $("#donaldCard").prependTo($("#fightArena"));
      $("#heroCard").appendTo($("#heroList"));
    }
  });
  $("#selectRiku").on("click", function() {
    if (!warriorOfLight.heroSelected) {
      warriorOfLight.heroSelected = true;

      /* Remember hero pick to obj */
      warriorOfLight.lightChampion = warriorOfLight.hero.riku;

      /* Latch to page */
      warriorOfLight.heroToBanish = $("#rikuCard");
      warriorOfLight.heroLVel = $("#rikuCard #level");
      warriorOfLight.heroAtkEl = $("#rikuCard #attack");
      warriorOfLight.heroHPel = $("#rikuCard #hp");

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

      warriorOfLight.cardToBanish = $("#phantomCard");
      warriorOfLight.monsterHPel = $("#phantomCard #hp");
      warriorOfLight.darkMinion = warriorOfLight.monster.phantom;

      $(this).hide(0);
      $("#deSelectPhantom").show(0);
      $("#phantomCard").appendTo($("#fightArena"));
      $("#monsterCard").appendTo($("#monsterList"));
    }
  });

  $("#selectAqua").on("click", function() {
    if (!warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = true;

      warriorOfLight.cardToBanish = $("#aquaCard");
      warriorOfLight.monsterHPel = $("#aquaCard #hp");
      warriorOfLight.darkMinion = warriorOfLight.monster.aqua;

      $(this).hide(0);
      $("#deSelectAqua").show(0);
      $("#aquaCard").appendTo($("#fightArena"));
      $("#monsterCard").appendTo($("#monsterList"));
    }
  });

  $("#selectXaldin").on("click", function() {
    if (!warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = true;

      warriorOfLight.cardToBanish = $("#xaldinCard");
      warriorOfLight.monsterHPel = $("#xaldinCard #hp");
      warriorOfLight.darkMinion = warriorOfLight.monster.xaldin;

      $(this).hide(0);
      $("#deSelectXaldin").show(0);
      $("#xaldinCard").appendTo($("#fightArena"));
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
  $("#deSelectAqua").on("click", function() {
    if (warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = false;
      $(this).hide(0);
      $("#selectAqua").show(0);
      $("#aquaCard").prependTo($("#monsterList"));
      $("#monsterCard").appendTo($("#fightArena"));
    }
  });
  $("#deSelectXaldin").on("click", function() {
    if (warriorOfLight.monsterSelected) {
      warriorOfLight.monsterSelected = false;
      $(this).hide(0);
      $("#selectXaldin").show(0);
      $("#xaldinCard").prependTo($("#monsterList"));
      $("#monsterCard").appendTo($("#fightArena"));
    }
  });
  /* De-select Monsters */

  /* One-time hero selection */
  $("#atkBtn").on("click", function() {
    if (warriorOfLight.firstStart){
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
          warriorOfLight.firstStart = false;
          warriorOfLight.inCombat = true;
          warriorOfLight.getHeroInfo();
          warriorOfLight.getMonsterInfo();
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
    }

  });
  /* One-time hero selection */

  $("#atkBtn").on("click", function() {
    if (warriorOfLight.inCombat) {
      warriorOfLight.heroAttack();
    } if (warriorOfLight.monsterHP > 0) {
      warriorOfLight.monsterCounter();
    } else {
      warriorOfLight.monsterBanish();
    }













  });
});

/* $("#logs").prepend("<div>" + $("#logs div").length + ". " + "Please select your Light Champion and pick a Monster to fight" + "</div>"); */
/*    if (this.monsterHP > 0) {
      this.heroHP = this.heroHP - this.monsterAtk;
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "Monster counters for " +
          this.darkMinion.stat.baseAtk +
          " damage" +
          "</div>"
      );
      if (this.heroHP <= 0) {
        inCombat = false;
        gameStart = false;
        gameFinish = true;
        this.heroToBanish.remove();
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "YOU DIED - Game Over!" +
            "</div>"
        );
      } else {
        this.heroLV++;
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "Level Up! ATK increase by " +
            this.lightChampion.stat.baseAtk +
            "." +
            "</div>"
        );
      }
    } else if (this.monsterHP <= 0) {
      this.cardToBanish.remove();
      this.inCombat = false;
      this.score++;
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "Darkness has been banish." +
          "</div>"
      );
      if (this.score == 3) {
        this.gameFinish = true;
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "All monsters have been banished. Once again, the world is save" +
            "</div>"
        );
      } else if (this.score < 3) {
        $(".monsterSelectBtn").show();
        this.monsterSelected = false;
        $("#monsterCard").appendTo($("#fightArena"));
      }
    }

    this.heroAtk = this.heroAtk + this.lightChampion.stat.baseAtk;
    warriorOfLight.heroAtkEl.text(warriorOfLight.heroAtk);
    warriorOfLight.heroHPel.text(warriorOfLight.heroHP);
    warriorOfLight.heroLVel.text(warriorOfLight.heroLV);
    warriorOfLight.monsterHPel.text(warriorOfLight.monsterHP);
  } */