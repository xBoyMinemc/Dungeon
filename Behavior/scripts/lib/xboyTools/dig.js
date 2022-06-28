import { world, BlockLocation } from "mojang-minecraft";




world.events.blockBreak.subscribe((blockEvent) => {

    console.warn("####挖掘成功####")
    let player = blockEvent.player;
    let breakonBlockTags = blockEvent.brokenBlockPermutation.getTags();

    let container = player.getComponent("inventory").container;
    let hand      = container.getItem(player.selectedSlot);

    const tools = {
        'minecraft:netherite_pickaxe': ['diamond_pick_diggable','iron_pick_diggable','stone_pick_diggable','wood_pick_diggable','gold_pick_diggable'],
        'minecraft:diamond_pickaxe'  : ['diamond_pick_diggable','iron_pick_diggable','stone_pick_diggable','wood_pick_diggable','gold_pick_diggable'],
        'minecraft:iron_pickaxe'     : ['iron_pick_diggable','stone_pick_diggable','wood_pick_diggable','gold_pick_diggable'],
        'minecraft:stone_pickaxe'    : ['stone_pick_diggable','wood_pick_diggable','gold_pick_diggable'],
        'minecraft:gloden_pickaxe'   : ['gold_pick_diggable','wood_pick_diggable'],
        'minecraft:wooden_pickaxe'   : ['wood_pick_diggable'],
    
        'minecraft:wooden_axe'       : ['log','acacia','birch','dark_oak','jungle','oak','spruce'],
        'minecraft:stone_axe'        : ['log','acacia','birch','dark_oak','jungle','oak','spruce'],
        'minecraft:iron_axe'         : ['log','acacia','birch','dark_oak','jungle','oak','spruce'],
        'minecraft:diamond_axe'      : ['log','acacia','birch','dark_oak','jungle','oak','spruce'],
        'minecraft:golden_axe'       : ['log','acacia','birch','dark_oak','jungle','oak','spruce'],
        'minecraft:netherite_axe'    : ['log','acacia','birch','dark_oak','jungle','oak','spruce']
    };
 
        !!(tools[hand.id] !== undefined)&&(Array.from(new Set(tools[hand.id].concat(breakonBlockTags))).length !== (tools[hand.id].length + breakonBlockTags.length))
        ? neighborBlock(blockEvent.block, blockEvent.dimension, blockEvent.brokenBlockPermutation.type.id)
        : console.warn("####00成功####");
    
});

function neighborBlock(blockLocationO, dimension, blockid){
                        const blockX = blockLocationO.x;
                        const blockY = blockLocationO.y;
                        const blockZ = blockLocationO.z;
                        const point_Object = {
                                   U : new BlockLocation(blockX, blockY + 1, blockZ),
                                   D : new BlockLocation(blockX, blockY - 1, blockZ),
                                   N : new BlockLocation(blockX, blockY, blockZ - 1),
                                   E : new BlockLocation(blockX + 1, blockY, blockZ),
                                   W : new BlockLocation(blockX - 1, blockY, blockZ),
                                   S : new BlockLocation(blockX, blockY, blockZ + 1)
                             };
                             
                        Object.keys(point_Object).forEach(p=>{
                            let bl = point_Object[p]
                            if(dimension.getBlock(new BlockLocation(bl.x, bl.y, bl.z)).id == blockid){

                                dimension.runCommand(`setblock ${bl.x} ${bl.y} ${bl.z} air 0 destroy`);
                                neighborBlock(bl, dimension, blockid);
                            }

                        })
                   
};

console.warn("####加载成功####")
