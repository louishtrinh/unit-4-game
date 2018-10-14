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
  guardCount: 3,
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
      name: "Sora",
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 15,
        baseMag: 15,
        baseHP: 350
      }
    },

    donald: {
      name: "Donald",
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 4,
        baseMag: 20,
        baseHP: 150
      }
    },

    riku: {
      name: "Riku",
      stat: {
        baseXP: 0,
        baseLV: 1,
        baseAtk: 25,
        baseMag: 2,
        baseHP: 200
      }
    }
  },

  monster: {
    phantom: {
      stat: {
        baseAtk: 5,
        baseHP: 200
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
        baseHP: 800
      }
    }
  },

  isGuarding: false,
  firstStart: true,
  heroSelected: false,
  monsterSelected: false,
  inCombat: false,
  gameFinish: false,
  gameLost: false,

  initialize: function() {
    $("#deSelectSora").hide();
    $("#deSelectDonald").hide();
    $("#deSelectRiku").hide();
    $("#deSelectPhantom").hide();
    $("#deSelectAqua").hide();
    $("#deSelectXaldin").hide();
  },

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

  gameStart: function() {
    if (this.score == 0) {
      var playBackGround = document.getElementById("audio");
      playBackGround.play();
      warriorOfLight.inCombat = true;
      warriorOfLight.getHeroInfo();
      warriorOfLight.getMonsterInfo();
      $(".heroSelectBtn").remove();
      $(".monsterSelectBtn").hide();
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "Initiate Fight, good luck!" +
          "</div>"
      );
    } else {
      warriorOfLight.inCombat = true;
      warriorOfLight.getMonsterInfo();
      $(".heroSelectBtn").remove();
      $(".monsterSelectBtn").hide();
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "Initiate Fight, good luck!" +
          "</div>"
      );
    }
  },

  heroAttack: function() {
    this.monsterHP = this.monsterHP - this.heroAtk;
    var getHeroName = this.lightChampion.name;

    $("#logs").prepend(
      "<div style='color:green;'>" +
        $("#logs div").length +
        ". " + getHeroName +
        " hits for " +
        this.heroAtk +
        " damage" +
        "</div>"
    );
    this.monsterHPel.text(this.monsterHP);
    this.levelUp();
  },

  heroFire: function() {
    var getHeroName = this.lightChampion.name;
    var multiplier = Math.floor(Math.random() * 3)+1;
    this.monsterHP = this.monsterHP - (this.heroMag*multiplier);
    $("#logs").prepend(
      "<div style='color:green;'>" +
        $("#logs div").length +
        ". " + getHeroName +
        " hurls "+multiplier+ " fireballs for " +
        (this.heroMag*multiplier) +
        " damage" +
        "</div>"
    );
    this.monsterHPel.text(this.monsterHP);
    this.levelUp();
  },

  heroIce: function() {
    var getHeroName = this.lightChampion.name;
    var multiplier = Math.floor(Math.random() * 3)+1;
    this.monsterHP = this.monsterHP - (this.heroMag*multiplier);
    $("#logs").prepend(
      "<div style='color:green;'>" +
        $("#logs div").length +
        ". " + getHeroName +
        " shoots "+multiplier+ " ice shards for " +
        (this.heroMag*multiplier) +
        " damage" +
        "</div>"
    );
    this.monsterHPel.text(this.monsterHP);
    this.levelUp();
  },

  heroGrd: function() {
    this.guardCount --;
    var getHeroName = this.lightChampion.name;

    var multiplier = Math.floor(Math.random() * 3)+1;
    this.heroHP = this.heroHP + (20 * multiplier);
    $("#logs").prepend(
      "<div style='color:green;'>" +
        $("#logs div").length +
        ". " +"While guarding, "+ getHeroName +
        " manages to pop "+multiplier+ " healing elixirs. " +
        (20*multiplier) +
        " HP up!" +
        "</div>"
    );
    this.heroHPel.text(this.heroHP);
  },

  checkShield: function() {
    if (this.guardCount <= 0) {
      $("#logs").prepend("<div style='color:red;'>" +$("#logs div").length +". " +"Shield is broken" + "</div>");
      $("#grdBtn").remove();
    } else {        $("#logs").prepend("<div>" +$("#logs div").length +". " +"Number of blow shield can withstand: " +this.guardCount+ "</div>");

    }
  },

  levelUp: function() {
    this.heroLV++;

    this.heroAtk = this.heroAtk + this.lightChampion.stat.baseAtk;
    this.heroMag = this.heroMag + this.lightChampion.stat.baseMag;

    this.heroAtkEl.text(this.heroAtk);
    this.heroMagEl.text(this.heroMag);
    this.heroLVel.text(this.heroLV);
    $("#logs").prepend(
      "<div>" +
        $("#logs div").length +
        ". " +
        "Level Up! ATK grow by " +
        this.lightChampion.stat.baseAtk +
        " to " +
        this.heroAtk +
        " and " + "MAGIC grow by " +
        this.lightChampion.stat.baseMag +
        " to " +
        this.heroMag +
        "</div>"
    );
/*     $("#logs").prepend(
      "<div>" +
        $("#logs div").length +
        ". " +
        "Level Up! MAGIC increase by " +
        this.lightChampion.stat.baseMag +
        " to " +
        this.heroMag +
        "." +
        "</div>"
    ); */
  },

  monsterCounter: function() {
    this.heroHP = this.heroHP - this.monsterAtk;
    this.heroHPel.text(this.heroHP);
    $("#logs").prepend(
      "<div style='color:red;'>" +
        $("#logs div").length +
        ". " +
        "Monster counters for " +
        this.darkMinion.stat.baseAtk +
        " damage" +
        "</div>"
    );

  },

  monsterAttack: function() {
    $("#logs").prepend(
      "<div style='color:green;'>" +
        $("#logs div").length +
        ". " +
        "Shield has completely nulified " +
        this.darkMinion.stat.baseAtk +
        " damage" +
        "</div>"
        );
        this.checkShield();


  },

  monsterBanish: function() {
    this.monsterSelected = false;
    this.inCombat = false;
    this.score++;
    this.cardToBanish.remove();
    $(".monsterSelectBtn").show();
    this.initialize();
    $("#monsterCard").appendTo($("#fightArena"));
  },
  checkWinCondition: function() {
    if (this.score == 3) {
      this.gameFinish = true;
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "All enemies banished. Thanks to you, this world is safe from Darkness!" +
          "</div>"
      );
      var changeCardHeader = $("#monsterCard #cardHeader");
      changeCardHeader.text("The realm is safe, for now.");
    }
  },
  checkLoseCondition: function() {
    if (this.heroHP <= 0) {
      this.gameFinish = true;
      this.gameLost = true;
      this.inCombat = false;
      this.heroToBanish.remove();
      $("#heroCard").appendTo($("#fightArena"));
      $("#logs").prepend(
        "<div>" +
          $("#logs div").length +
          ". " +
          "You have been defeated. And soon, your companions shall share the same fate. The good people of Twilight Town will face certain death all because of your bad judment." +
          "</div>"
      );
      var changeCardHeader = $("#heroCard #cardHeader");
      changeCardHeader.text("This world is lost to Darkness. Re-fresh to try again");
    }
  },

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
      warriorOfLight.heroMagEl = $("#soraCard #magic");
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
      warriorOfLight.heroMagEl = $("#donaldCard #magic");
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
      warriorOfLight.heroMagEl = $("#rikuCard #magic");
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

  /* ATTACK BUTTON */
  $("#atkBtn").on("click", function() {
    if (!warriorOfLight.gameFinish) {
      if (!warriorOfLight.inCombat) {
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
          warriorOfLight.gameStart();
        }
      } else if (warriorOfLight.inCombat) {
        if (warriorOfLight.inCombat) {
          warriorOfLight.heroAttack();
        }
        if (warriorOfLight.monsterHP > 0) {
          warriorOfLight.monsterCounter();
          if (warriorOfLight.heroHP){
            warriorOfLight.checkLoseCondition();
          }
        } else {
          warriorOfLight.monsterBanish();
          warriorOfLight.checkWinCondition();
        }
      }
    } 
    else if (warriorOfLight.gameFinish) {
      if (!warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "The realm is now safe, no enemies in sight!" +
            "</div>"
        );
      } else if (warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "All has been lost, re-fresh to start over." +
            "</div>"
        );
      }
    }
  });
  /* ATTACK BUTTON */


  /* FIRE SPELL */
  $("#fireBtn").on("click", function() {
    if (!warriorOfLight.gameFinish) {
      if (!warriorOfLight.inCombat) {
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
          warriorOfLight.gameStart();
        }
      } else if (warriorOfLight.inCombat) {
        if (warriorOfLight.inCombat) {
          warriorOfLight.heroFire();
        }
        if (warriorOfLight.monsterHP > 0) {
          warriorOfLight.monsterCounter();
          if (warriorOfLight.heroHP){
            warriorOfLight.checkLoseCondition();
          }
        } else {
          warriorOfLight.monsterBanish();
          warriorOfLight.checkWinCondition();
        }
      }
    } 
    else if (warriorOfLight.gameFinish) {
      if (!warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "The realm is now safe, no enemies in sight!" +
            "</div>"
        );
      } else if (warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "All has been lost, re-fresh to start over." +
            "</div>"
        );
      }
    }
  });
  /* FIRE SPELL */

  /* ICE SPELL */
  $("#iceBtn").on("click", function() {
    if (!warriorOfLight.gameFinish) {
      if (!warriorOfLight.inCombat) {
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
          warriorOfLight.gameStart();
        }
      } else if (warriorOfLight.inCombat) {
        if (warriorOfLight.inCombat) {
          warriorOfLight.heroIce();
        }
        if (warriorOfLight.monsterHP > 0) {
          warriorOfLight.monsterCounter();
          if (warriorOfLight.heroHP){
            warriorOfLight.checkLoseCondition();
          }
        } else {
          warriorOfLight.monsterBanish();
          warriorOfLight.checkWinCondition();
        }
      }
    } 
    else if (warriorOfLight.gameFinish) {
      if (!warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "The realm is now safe, no enemies in sight!" +
            "</div>"
        );
      } else if (warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "All has been lost, re-fresh to start over." +
            "</div>"
        );
      }
    }
  });
  /* ICE SPELL */

  /* GUARDING */
  $("#grdBtn").on("click", function() {
    if (!warriorOfLight.gameFinish) {
      if (!warriorOfLight.inCombat) {
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
          warriorOfLight.gameStart();
        }
      } else if (warriorOfLight.inCombat) {
        if (warriorOfLight.inCombat) {
          warriorOfLight.heroGrd();
        }
        if (warriorOfLight.monsterHP > 0) {
          warriorOfLight.monsterAttack();
          if (warriorOfLight.heroHP){
            warriorOfLight.checkLoseCondition();
          }
        } else {
          warriorOfLight.monsterBanish();
          warriorOfLight.checkWinCondition();
        }
      }
    } 
    else if (warriorOfLight.gameFinish) {
      if (!warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "The realm is now safe, no enemies in sight!" +
            "</div>"
        );
      } else if (warriorOfLight.gameLost) {
        $("#logs").prepend(
          "<div>" +
            $("#logs div").length +
            ". " +
            "All has been lost, re-fresh to start over." +
            "</div>"
        );
      }
    }
  });
  /* GUARDING */

});