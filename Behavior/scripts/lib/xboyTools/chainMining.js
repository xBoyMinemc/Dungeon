//#=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=#//
//#https://github.com/xBoyMinemc/Dungeon/blob/master/Behavior/scripts/lib/xboyTools/chainMining.js   
//#=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=#//
//

import {  BlockLocation } from "mojang-minecraft";

var   List_AA_Object = {}
var   List_BB_Object = {}
let mineCount = 0
const MAX_MINE_COUNT = 64 - 1      //这个数字只是个大概，因为写的并不严谨，反正自己用的
const List_A_Object = {
          //木质工具连个屁  "minecraft:wooden_pickaxe" : []
          //金质....
          "minecraft:golden_pickaxe"       : [ "minecraft:coal_ore", "minecraft:deepslate_coal_ore", "minecraft:quartz_ore", "minecraft:nether_gold_ore"],
          "minecraft:stone_pickaxe"        : [ "minecraft:iron_ore", "minecraft:deepslate_iron_ore", "minecraft:copper_ore", "minecraft:deepslate_copper_ore", "minecraft:lapis_ore", "minecraft:deepslate_lapis_ore"],
          "minecraft:iron_pickaxe"         : [ "minecraft:gold_ore", "minecraft:deepslate_gold_ore", "minecraft:emerald_ore", "minecraft:deepslate_emerald_ore", "minecraft:diamond_ore", "minecraft:deepslate_diamond_ore", "minecraft:lit_redstone_ore", "minecraft:deepslate_lit_redstone_ore", "minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"],
          "minecraft:diamond_pickaxe"      : [ "minecraft:ancient_debris"],//,"minecraft:gold_block", "minecraft:deepslate_bricks"
          "minecraft:netherite_pickaxe"    : []
}
const List_B_Object = {
          "minecraft:golden_axe"       : ["minecraft:log", "minecraft:log2", "minecraft:mangrove_log", "minecraft:crimson_stem", "minecraft:warped_stem"],//, "minecraft:", "minecraft:"
          "minecraft:stone_axe"        : [],
          "minecraft:iron_axe"         : [],
          "minecraft:diamond_axe"      : [],
          "minecraft:netherite_axe"    : []
}

var neighborBlock = function(blockLocationO, dimension, blockid){
                        const blockX = blockLocationO.x
                        const blockY = blockLocationO.y
                        const blockZ = blockLocationO.z
                        const point_X = {
                                   U : new BlockLocation(blockX, blockY + 1, blockZ),
                                   D : new BlockLocation(blockX, blockY - 1, blockZ),
                                   N : new BlockLocation(blockX, blockY, blockZ - 1),
                                   E : new BlockLocation(blockX + 1, blockY, blockZ),
                                   W : new BlockLocation(blockX - 1, blockY, blockZ),
                                   S : new BlockLocation(blockX, blockY, blockZ + 1)
                             }
                        const point  = ["U","D","N","E","W","S"]//被挖掘方块六面接触的方块
                        
                        point.forEach(p=>{
                        let bl = point_X[p]
                        if(dimension.getBlock(new BlockLocation(bl.x, bl.y, bl.z)).id == blockid && mineCount < MAX_MINE_COUNT){
                        //#IF#1
                        
                        mineCount++;
                        dimension.runCommand(`setblock ${bl.x} ${bl.y} ${bl.z} air 0 destroy`);
                       // dimension.runCommand(`fill ${bl.x} ${bl.y} ${bl.z} ${bl.x} ${bl.y} ${bl.z} air 1 destroy`);
                        //dimension.runCommand(`me 连锁破坏了一个方块`);
                        neighborBlock(bl, dimension, blockid)
                        
                           }
                         //#ENDIF#1
                        })
                   
}
//EndFunction

const List_Array_A = Object.keys(List_A_Object)//希望别给我整幺蛾子，希望不要乱序，希望不要乱序，希望不要乱序

List_Array_A.forEach(item => {
List_AA_Object[item] = []
for(let i=List_Array_A.indexOf(item);i>-1;i--){

List_AA_Object[item] = List_AA_Object[item].concat(List_A_Object[List_Array_A[i]])

}
})

const List_Array_B = Object.keys(List_B_Object)//希望别给我整幺蛾子，希望不要乱序，希望不要乱序，希望不要乱序

List_Array_B.forEach(item => {
List_BB_Object[item] = []
for(let i=List_Array_B.indexOf(item);i>-1;i--){

List_BB_Object[item] = List_BB_Object[item].concat(List_B_Object[List_Array_B[i]])

}
})

let chainMining = function(breakBlockId, block, dimension, player){
                           //坐标id获取   锚点      执行者

                           
                     let itemObject = player.getComponent("inventory").container.getItem(player.selectedSlot)
                     let xboy;
                     

                     if(itemObject){
                     let itemIdString = itemObject.id
                     if (List_Array_A.includes(itemIdString)) {
                     //#IF#1
                        if (List_AA_Object[itemIdString].includes(breakBlockId)) {
                        //#IF#2
                        neighborBlock(block, dimension, breakBlockId)
                        }
                        //EndIF#2
                     }
                     //#EndIF#1

                     if (List_Array_B.includes(itemIdString)) {
                        //#IF#1
                           if (List_BB_Object[itemIdString].includes(breakBlockId)) {
                           //#IF#2
                           neighborBlock(block, dimension, breakBlockId)
                           }
                           //EndIF#2
                        }
                        //#EndIF#1
   }
 let i = mineCount;
 mineCount = 0;
 return i;
}

let abc = function (){
           
           let blockLocationO = new BlockLocation(1, 2, 1)
           
console.warn("##++##",blockLocationO.x,blockLocationO.y,blockLocationO.z)
           
}
           
console.warn("#######++++++++++#######加载成功")


export default chainMining
//export default abc
