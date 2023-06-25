const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const parseData = (type, rank) => {
    let dataType = [
        { name: 'unrated', value: 'Đấu thường' },
        { name: 'competitive', value: 'Xếp hạng' },
    ]
    let dataRank = [
        { name: 'radiant', value: 'https://i.imgur.com/5rW8Zoa.png' }, 
        { name: 'immortal', value: 'https://i.imgur.com/EmOheVe.png' }, 
        { name: 'ascendant', value: 'https://i.imgur.com/ZbX7kkG.png' }, 
        { name: 'diamond', value: 'https://i.imgur.com/JLMy5Hy.png' }, 
        { name: 'platinum', value: 'https://i.imgur.com/c3kS57m.png' }, 
        { name: 'gold', value: 'https://i.imgur.com/bWCv6md.png' }, 
        { name: 'silver', value: 'https://i.imgur.com/AXh4mex.png' }, 
        { name: 'bronze', value: 'https://i.imgur.com/uMg2uDn.png' }, 
        { name: 'iron', value: 'https://i.imgur.com/3CGMSe6.png' }, 
        { name: 'unrated', value: 'https://i.imgur.com/jZpTWt3.png' }
    ]
    let avatar = ''
    let tp = ''
    for (let i = 0; i <= dataRank.length; i++) {
        if (dataRank[i].name === rank){
            avatar = dataRank[i].value
            break;
        }
    }
    for (let j = 0; j <= dataType.length; j++) {
        if (dataType[j].name === type){
            tp = dataType[j].value
            break;
        }
    }
    return {
        type: tp,
        rank: avatar,
    }
}

const Embed = (data, author) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setAuthor({ name: author.username, iconURL: `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=256` })
    // .setDescription('Some description here')
    .setThumbnail(data.rank)
    .addFields(
        { name: 'Chế độ chơi', value: data.type },
        { name: '\u200B', value: '\u200B' },
    )
    //.setImage('https://i.imgur.com/AfFp7pu.png')
    //.setTimestamp()
    .setFooter({ text: 'Cách dùng: dùng lệnh slash /kj, chọn chế độ chơi, rank và mời mọi người!', iconURL: 'https://i.imgur.com/uGrCoUm.png' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kj')
        .setDescription('Invite more player to your lobby')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Chế độ chơi')
                .setRequired(true)
                .addChoices({ name: 'Đấu thường', value: 'unrated' }, { name: 'Xếp hạng', value: 'competitive' }))
        .addStringOption(option =>
            option.setName('rank')
                .setDescription('chọn Rank muốn tìm')
                .setRequired(true)
                .addChoices({ name: 'Radiant', value: 'radiant' }, { name: 'Immortal', value: 'immortal' }, { name: 'Ascendant', value: 'ascendant' }, { name: 'Diamond', value: 'diamond' }, { name: 'Platinum', value: 'platinum' }, { name: 'Gold', value: 'radiant' }, { name: 'Silver', value: 'silver' }, { name: 'Bronze', value: 'bronze' }, { name: 'Iron', value: 'iron' }, { name: 'Unrated', value: 'unrated' })),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'Bạn cần vào một kênh thoại trước khi dùng lệnh này', ephemeral: true })
        } else {
            const rank = interaction.options.getString('rank')
            const type = interaction.options.getString('type')
            const author = interaction.user
            const data = parseData(type, rank)
            console.log({
                rank,
                type,
                author,
                data
            })
            console.log(type)
            await interaction.reply({embeds: [Embed(data, author)]});
        }
    },
};