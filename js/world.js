var World = {
    DAYS_TO_PAY: 10,
    money: 0,
    gametime: 0,
    gRefreshInterval: null,
    gIsGameOver: false,
    gRefreshInterval: null,
    moneyDiv: document.getElementById("money"),
    timeDiv: document.getElementById("time"),
    init: function () {
        $("#bnRestart").hide();

        this.gametime = this.DAYS_TO_PAY;
        Notifications.init();

        this.setMoney(5000);
        this.syncUI();

        this.gIsGameOver = false;

        this.gRefreshInterval = setInterval(function () {
            World.gameloop();
        }, 1000);
    },
    setMoney: function (amount) {
        this.money += amount;
    },
    syncUI: function () {
        this.moneyDiv.innerText = "Money: " + this.money;
        this.timeDiv.innerText = this.gametime;
        if(this.timeDiv.innerText >= 0 && this.timeDiv.innerText <= 5){
            this.timeDiv.className = "countdown";
        } else {
            this.timeDiv.className = "";
        }
    },
    gameloop: function () {
        this.gametime -= 1;

        if (this.gametime < 0) {
            onPayTaxes();
            this.gametime = this.DAYS_TO_PAY;
        }

        this.checkGameOver();
        if (this.gIsGameOver) {
            return;
        }
        this.syncUI();
    },
    checkGameOver: function () {
        if (World.money <= 0) {
            this.gIsGameOver = true;
            clearInterval(this.gRefreshInterval);
            Notifications.create("GAME OVER :(");
            $("#bnRestart").show();
        }
    }
}