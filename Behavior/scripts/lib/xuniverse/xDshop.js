import { world } from "mojang-minecraft";
import { orxyz, where }                  from '../xuniverse/xconfig.js';                    //配置变量
//############################################################################
//who
const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");
const getScorePlayerStr = function (playerName,obj){return overworld.runCommand(`scoreboard players test "${playerName}" ${obj} * *`).statusMessage.split("在")[0].replaceAll("分数","").replaceAll(" ","");};
const setScorePlayerStr = function (name,obj,num){overworld.runCommand(`scoreboard players set "${name}" ${obj} ${num}`)};
const addScorePlayerStr = function (name,obj,num){overworld.runCommand(`scoreboard players add "${name}" ${obj} ${num}`)};//仨旧时代的产物

const FIX = Math.random() + 0.6
const goodsListObject = {
    "木材" : {
         "橡木" : {
        itemName    : "minecraft:log",
        itemData    : 0,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        },
        "云杉木" : {
        itemName    : "minecraft:log",
        itemData    : 1,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        },
        "白桦木" : {
        itemName    : "minecraft:log",
        itemData    : 2,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        },
        "从林木" : {
        itemName    : "minecraft:log",
        itemData    : 3,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        },
        "金合欢木" : {
        itemName    : "minecraft:log2",
        itemData    : 0,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        },
        "深色橡木" : {
        itemName    : "minecraft:log2",
        itemData    : 1,
        itemCount   : 64,
        price       : (48*FIX*3).toFixed(0)
        }
    },
    "石材" : {
        "圆石" : {
            itemName    : "minecraft:cobblestone",
            itemData    : 0,
            itemCount   : 64,
            price       : (64*(FIX)).toFixed(0)
            },
        "石砖" : {
            itemName    : "minecraft:stonebrick",
            itemData    : 0,
            itemCount   : 64,
            price       : (96*(FIX)).toFixed(0)
            }
    },
    "食材" : {
        "小面包" : {
            itemName    : "minecraft:bread",
            itemData    : 0,
            itemCount   : 16,
            price       : (16*(FIX+8.5)).toFixed(0)
            }
    }
    //"建材" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : []
}

const shop = function(){

}

world.events.beforeChat.subscribe(msg => {

   const {message} = msg;
    if(message=="地牢商店菜单" || message=="地牢商店列表" || message=="地牢商店" ){
        msg.cancel = true
        Object.keys(goodsListObject).forEach((key)=>{
            let color = Math.floor(Math.random() * 9)+1;
            msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§l§${color}#商品分类：${key}"} ]}`)
            Object.keys(goodsListObject[key]).forEach((keyb)=>{
            msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"|_____§r§l§${color}#商品名称：${keyb} # 价格：${goodsListObject[key][keyb].itemCount}个/${goodsListObject[key][keyb].price}地牢积分 "}]}`)
            })
        })
    }
    //地牢购买 木材 原木 1
    if(message.startsWith("地牢购买 ")){
        msg.cancel = true
        let color = Math.floor(Math.random() * 10);
        let Arr = message.replace("地牢购买 ","").split(" ")
        if(Arr.length == 3){
            if(goodsListObject[Arr[0]]){if(goodsListObject[Arr[0]][Arr[1]]){
                let goods = goodsListObject[Arr[0]][Arr[1]]
                let price = goods.price
                if(+getScorePlayerStr(msg.sender.nameTag,"xdungon_dis")>=price*(+Arr[2])){
                   addScorePlayerStr(msg.sender.nameTag,"xdungon_dis",-1*price*(+Arr[2]))
                   msg.sender.runCommand(`give @s ${goods.itemName} ${+Arr[2]*goods.itemCount} ${goods.itemData}`)
                 }else{
                     msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§l§${color}#穷鬼爬，无功无禄"} ]}`)
                }
            }else{
                msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§l§${color}#无此商品，输入地牢商店菜单"} ]}`)}
            }else{
                msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§l§${color}#无此商品，输入地牢商店菜单"} ]}`)}
        }else{
            msg.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§r§l§${color}#格式错误，示例：§r§l地牢购买 木材 原木 1              格式： 地牢购买 分类 物品名 份数"} ]}`)
        }
    }
})

