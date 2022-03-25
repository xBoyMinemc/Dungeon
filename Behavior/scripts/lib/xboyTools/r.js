import { world, ItemStack, MinecraftItemTypes } from "mojang-minecraft";
import { xbLang } from "../xpackage/lang-test.js";

const xboyList = {
            " c": "amount",
            " count": "amount",
            " a": "amount",
            " amount": "amount",
            " d": "data",
            " data": "data",
            " n": "nameTag",
            " name": "nameTag",
            " nametag": "nameTag",
            " d": "data",
            " durability": "data"
        }

const xItem2StackAnount = {
    "bow" : 1,
    "axe" : 1,
    "sword" : 1,
    "shovel" : 1,
    "hoe" : 1,
    "horsearmor" : 1,
    "helmet" : 1,
    "chestplate" : 1,
    "boots" : 1,
    // "leggings" : 1,
    "egg" : 1,
    "bucket" : 1,
    "totem" : 1,
    "map" : 1,
    //"sign" : 16,
    "book" : 1,
    "bee_nest" : 1,
    "soup" : 1,
    "stew" :1,
    "bed" : 1,
    "boat" : 1,
    "cake" : 1,
    "campfire" : 1,
    "minecart" : 1,
    "clock" : 1,
    "compass" : 1,
    "potion" :1,
    "honey_bottle" : 1,
    "record" : 1,
    "saddle" : 1,
    "shears" : 1,
    "shield" : 1,
    "shulker_shell" : 1
}

const xItem2StackAnountKeys = Object.keys(xItem2StackAnount);


world.events.beforeChat.subscribe(msg => {

    let { message, sender } = msg
    let mm = message.toLowerCase();


    let inv = sender
    if (mm.startsWith("r") || mm.startsWith("c")) {
        let mmm = mm.slice(1);
        if (!(mmm == "" || mmm.startsWith(" "))) return;
        msg.cancel = true;
        let a = 1
        let z = -1
        if (message.startsWith('r')) { a = 1; z = -1; inv = sender; }
        if (message.startsWith('R')) { a = -1; z = 1; inv = sender; }
        if (message.startsWith('c')) { a = 1; z = -1; inv = sender.getBlockFromViewVector(); }
        if (message.startsWith('C')) { a = -1; z = 1; inv = sender.getBlockFromViewVector(); }

        let xboy = "xboy"


        if (mmm == "") { xboy = "id" } else {
            xboy = xboyList[mmm]
        }

        if (mmm == " help" || mmm == " h") {
            let CMD = "cmd"
            let By = "By"



            if (xbLang().startsWith("zh")) {
                CMD = "命令示例"
                By = "分类依据"
            }
            Object.keys(xboyList).forEach((key) => {
                let color = Math.floor(Math.random() * 9) + 1;
                msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"|_____§r§l§${color}#${CMD}：${mm.slice(0, 1) + key} # ${By}：${xboyList[key]} "}]}`)
            })
            return;
        }
        if (xboy == "xboy") return;
        let items = []
        let air = new ItemStack(MinecraftItemTypes.air, 0, 0)
        for (let i = 0; i < inv.getComponent("inventory").container.size; i++) {
            let item = inv.getComponent("inventory").container.getItem(i)
            if (!item) { items.push(air); continue; }
            //
            items.push(item)
            //console.log(i, item.id)
        }

        let xboySort = function () {
            let l = 0;
            items.sort((x, y) => x[xboy] > y[xboy] ? a : z);

            for (let i = 1; i < inv.getComponent("inventory").container.size; i++) {
                let xboy = 0;
                let itemx = items[i - 1]
                let itemy = items[i]
                xItem2StackAnountKeys.forEach((itemName)=>{
                    if(itemx.id.indexOf(itemName)) xboy++;
                    if(itemy.id.indexOf(itemName)) xboy++;
                })
                if(xboy) continue;
                if (!itemx || !itemy || itemx.amount >= 64 || itemy.amount >= 64 || itemx.amount == 0 || itemy.amount == 0 || itemx.id == "" || itemy.id == "") { continue; }
                if (!(itemx.data == itemy.data && itemx.nameTag == itemy.nameTag && itemx.id == itemy.id)) { continue; }

                if (itemx.amount + itemy.amount >= 128) continue;
                if (itemx.amount + itemy.amount <= 64) {
                    l++;
                    // console.log("64>",itemx.amount + itemy.amount  ,itemx.amount + itemy.amount <= 64 ,"因为前者",itemx.id,"有",itemx.amount,"个.","后者",itemy.id,"有",itemy.amount,"个。","所以前者设为",  itemx.amount + itemy.amount,"个所以后者设为", air.id );
                    items[i].amount = itemx.amount + itemy.amount;
                    items[i - 1] = air;
                    if (itemx.amount + itemy.amount != items[i].amount + items[i - 1]) {
                        console.log(itemx.amount + itemy.amount, items[i].amount + items[i - 1].amount)
                    }

                    //console.log("$#64>",itemx.amount + itemy.amount  ,itemx.amount + itemy.amount <= 64 ,"所以前者实际设为",  items[i-1].amount,"个所以后者实际设为", items[i].amount );
                    continue;
                };

                l++;
                items[i - 1].amount = itemx.amount + itemy.amount - 64;
                items[i].amount = 64;
                if (itemx.amount + itemy.amount != items[i].amount + items[i - 1]) {
                    console.log(itemx.amount + itemy.amount, items[i].amount + items[i - 1].amount)
                }
                //console.log("64<因为前者",itemx.id,"有",itemx.amount,"个.","后者",itemy.id,"有",itemy.amount,"个。","所以后者设为", itemx.amount + itemy.amount - 64)
                //console.log(i - 1, itemx.id, itemx.amount, "#", i, itemy.id, itemy.amount);

            }
            if (l == 0) { return; }
            xboySort()
        }

        xboySort()
        items.sort((x, y) => x[xboy] > y[xboy] ? a : z)
            .forEach((item, i) => {
                inv.getComponent("inventory").container.setItem(i, item)
            })

    }
})









