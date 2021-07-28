//============ DyLux Bot ============\\
//-- Whatsapp Connecting
const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
  MessageOptions,
  WALocationMessage,
  ReconnectMode,
  ProxyAgent,
  waChatKey,
  mentionedJid,
  processTime,
  ChatModification,
  whatsappID,
  WAConnectionTest,
} = require('@adiwajshing/baileys');

//-- Functions
const {color, bgcolor} = require('./lib/color');
const {fetchJson, fetchText} = require('./lib/fetcher');
const {recognize} = require('./lib/ocr');
const {_wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, success, close } = require('./lib/functions');

//-- Modules
const fs = require('fs');
const moment = require('moment-timezone');
const {exec} = require('child_process');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const imgbb = require('imgbb-uploader');
const speed = require('performance-now');
const cd = 4.32e+7 ;
const crypto = require('crypto');
const qrcode = require("qrcode-terminal");
const axios = require('axios');
const path = require('path');
const {removeBackgroundFromImageFile} = require('remove.bg');
const { EmojiAPI } = require("emoji-api");
const gis = require('g-i-s');
const request = require('request');
const emoji = new EmojiAPI()
const encodeUrl = require('encodeurl');

//-- Data
const up = JSON.parse(fs.readFileSync('./data/setting.json'));
const _welcom = JSON.parse(fs.readFileSync('./data/welcom.json'));
const _user = JSON.parse(fs.readFileSync('./data/user.json'));
const _antilink = JSON.parse(fs.readFileSync('./data/antilink.json'));
const hit = JSON.parse(fs.readFileSync('./data/totalhit.json'))
const ban = JSON.parse(fs.readFileSync('./data/banned.json'))
//-- Media
const _stik = JSON.parse(fs.readFileSync('./media/stik.json'))
const _vid = JSON.parse(fs.readFileSync('./media/vid.json'))
const _vn = JSON.parse(fs.readFileSync('./media/vn.json'))
const _img = JSON.parse(fs.readFileSync('./media/image.json'))

//-- Resultados
const _verdad = JSON.parse(fs.readFileSync('./result/verdad.json'));
const _reto = JSON.parse(fs.readFileSync('./result/reto.json'));
const _hechos = JSON.parse(fs.readFileSync('./result/hechos.json'));
const _motivacion = JSON.parse(fs.readFileSync('./result/motivacion.json'));
const _citas = JSON.parse(fs.readFileSync('./result/citas.json'));
const _tonteria = JSON.parse(fs.readFileSync('./result/tonteria.json'));
const _hacker = JSON.parse(fs.readFileSync('./result/hacker.json'));
const { bahasa } = require('./result/kodebahasa');
const { negara } = require('./result/kodenegara');

//-- Report
const _informe = JSON.parse(fs.readFileSync('./report/informe.json'));
const _solicitud = JSON.parse(fs.readFileSync('./report/solicitud.json'));

//-- Help
const { menu, menu1, menu2, menuOwner, menuGrup} = require('./help/menu');
const { info } = require('./help/info');
const { termux } = require('./help/termux');
const { wait, stick, err, group, banf, ownerB, premi, userB, admin, Badmin } = require('./help/respon');

//-- Setting
prefix = up.prefix
const memberlimit = up.memberlimit;
const banned = [
  ];

//número del dueño del bot
const ownerNumber = [
  "59172945992@s.whatsapp.net",
  ];

//***********  ***********//
const Vkey = 'apivinz'
const Xinz = 'XinzBot'
const Pkode = 'pais'
const lolkey = 'e2c14ab01e67ef9820eced22'  //está api puedecar, si tiene uno reemplacelo


//-- Hora y fecha
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
function tanggal(){
myMonths = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			myDays = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
			var tgl = new Date();
			var day = tgl.getDate()
			bulan = tgl.getMonth()
			var thisDay = tgl.getDay(),
			thisDay = myDays[thisDay];
			var yy = tgl.getYear()
			var year = (yy < 1000) ? yy + 1900 : yy;
			return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

//--Whatsapp empezar a conectar
async function starts() {
	const Fg = new WAConnection()
	Fg.logger.level = 'warn'
	Fg.on('qr', () => {
		console.log(color('[FG98]','aqua'), color("Escanee el codigo QR para conectarse...", "yellow"))
	})
	fs.existsSync('./session/FG98.json') && Fg.loadAuthInfo('./session/FG98.json')
Fg.on('connecting', () => {
        const time_connecting = moment.tz('America/La_Paz').format('HH:mm:ss')
        console.log(color('[FG98]','aqua'), color("Espere a que se conecte...", "yellow"))
    })
Fg.on('open', () => {
        const time_connect = moment.tz('America/La_Paz').format('HH:mm:ss')
        console.log(color('[FG98]','aqua'), color(`Conectado`, "aqua"))
        start('')
    })
	await Fg.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session/FG98.json', JSON.stringify(Fg.base64EncodedAuthInfo(), null, '\t'))
 
//BIENVENIDA Y DESPEDIDA
Fg.on('group-participants-update', async (anu) => {
		if (!_welcom.includes(anu.jid)) return
		try {
			const mdata = await Fg.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await Fg.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Hola @${num.split('@')[0]}\nBienvenido/a al Grupo *${mdata.subject}*

 *Pide las reglas del grupo*

 Escriba *${prefix}verify* para comenzar a usar el Bot.`
				
				let buff = await getBuffer(ppimg)
				Fg.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
	//salida
} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await Fg.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `_Adios @${num.split('@')[0]}_`
				let buff = await getBuffer(ppimg)
				Fg.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'promote') {
				num = anu.participants[0]
				try {
					ppimg = await Fg.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = ` *NUEVO ADMIN*

 *Nombre* : @${num.split('@')[0]}
 *Número* : ${num.replace('@s.whatsapp.net', '')}
 *Mensaje* : Felicidades  Admin 
`
				let buff = await getBuffer(ppimg)
				Fg.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
				
           } else if (anu.action == 'demote') {
				num = anu.participants[0]
				try {
					ppimg = await Fg.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = ` *ADMIN DEGRADADO*

 *Nombre* : @${num.split('@')[0]}
 *Número* : ${num.replace('@s.whatsapp.net', '')}
 *Mensaje* : Lo siento :'v
`
				let buff = await getBuffer(ppimg)
				Fg.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

const blocked = []
Fg.on('CB:Blocklist', json => {
      if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

Fg.on('chat-update', async (mek) => {
  if (!mek.hasNewMessage) return
  mek = mek.messages.all()[0]
  if (!mek.message) return
  if (mek.key && mek.key.remoteJid == 'status@broadcast') return
  if (mek.key.fromMe) return
  global.prefix
  global.blocked
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const type = Object.keys(mek.message)[0]
  const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
  const time = moment.tz('America/La_Paz').format('DD/MM HH:mm:ss')
  const jam = moment.tz('America/La_Paz').format('HH:mm')

//--
const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const is = budy.slice(0).trim().split(/ +/).shift().toLowerCase()
mess = {
   	ferr: ' Error! \nIntentalo de nuevo mas tarde'
   	}   
const args = body.trim().split(/ +/).slice(1)
const value = args.join(' ')
const isCmd = body.startsWith(prefix)
const totalchat = await Fg.chats.all()
const botNumber = Fg.user.jid
			
//-- Group Metadata
  const isGroup = from.endsWith('@g.us')
  const sender = isGroup ? mek.participant : mek.key.remoteJid
  const groupMetadata = isGroup ? await Fg.groupMetadata(from) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const groupId = isGroup ? groupMetadata.jid : ''
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
  const isOwner = ownerNumber.includes(sender)
  const isVerify = _user.includes(sender)
  //const isPrem = premium.includes(sender) || isOwner
  const isBan = blocked.includes(sender)
  const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
  const isGroupAdmins = groupAdmins.includes(sender) || false
  const isWelcom = isGroup ? _welcom.includes(from) : false
  const isAnti = isGroup ? _antilink.includes(from) : false
  const pushname = Fg.contacts[sender] != undefined ? Fg.contacts[sender].vname || Fg.contacts[sender].notify: undefined
  const isBanned = ban.includes(sender)
//-- otros
  const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
  const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = Fg.user.phone

//-- función de respuesta
			const reply = (teks) => {
				Fg.sendMessage(from, teks, text, {quoted:mek })
			}
			
			const sendMess = (hehe, teks) => {
				Fg.sendMessage(hehe, teks, text)
			}
			
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? Fg.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : Fg.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			
			//fake reply
      const replyimg = (pesan, tipe, rep1, rep2) => {
        Fg.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": `${rep1}`,
"fileLength": "201809",
"jpegThumbnail": `${rep2}` } } }})
      }
      
         //sticker emoji
   const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './media' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './media' + names + '.png'
                    let asw = './media' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        Fg.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
            //
			
//--MessageType
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')


//-- Sticker marca de agua 
			function addMetadata(packname, author) {	
				if (!packname) packname = 'FG98'; if (!author) author = pushname ;	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./exif/${name}.exif`)) return `./exif/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./exif/${name}.exif`, buffer, (err) => {	
					return `./exif/${name}.exif`	
				})	

			}
			
//--Colores
colors = ['red','white','black','blue','yellow','green']

//--Consola de registro de chat privado
if (!isGroup && isCmd) console.log(color('[FG98]','aqua'), "Pv", color(command, "blue"), "de", (sender.split('@')[0]),  args.length)
			
//--Consola de registro de grupo
if (isGroup && isCmd) console.log(color('[FG98]','aqua'), "Gp", color(command, "green"), "de", (sender.split('@')[0]), "en", (groupName), args.length)


//-- Ver características

			if (isOwner) {
			prem_ = '*Dueño*'
			}
let Welcome_ = 'Off'
			if (isWelcom) {
			Welcome_ = 'On'
			}
let AntiLink_ = 'Off'
			if (isAnti) {
			AntiLink_ = 'On'
			}

//--- Total comandos
const cmdadd = () => {
	hit[0].totalcmd += 1
	fs.writeFileSync('./data/totalhit.json', JSON.stringify(hit))
}
  if (isCmd) cmdadd()
  const reqcmd = JSON.parse(fs.readFileSync('./data/totalhit.json'))[0].totalcmd

//--Members limete de grupos
if (isGroup) {
  try {
    const getmemex = groupMembers.length
    if (getmemex <= memberlimit) {
  Fg.sendMessage(from, `Lo sentimos, el grupo debe  tener  ${memberlimit} miembros, Adiós  invitame cuando  haya esa cantidad`, text)

    setTimeout(() => {
    Fg.groupLeave(from) // ur cods
  }, 5000) // 1000 = 1s,
}
  } catch {
console.error(err)
  }
}

/////***   ***\\\\\
const linkwa = 'https://chat.whatsapp.com/'
		if (budy.includes(`${linkwa}`)){
		if (!isGroup) return
		if (!isAnti) return
    if (!isBotGroupAdmins) return reply(' Por suerte no soy  admin, asi que no te expulsare')
    linkgc = await Fg.groupInviteCode (from)
    if (budy.includes(`${linkwa}${linkgc}`)) return reply(' Menos mal que este enlace es de este grupo v:')
		if (isGroupAdmins) return reply(` Los *Admins* son libres `)
		Fg.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		setTimeout( () => {
		reply('Adios')
		}, 1100)
		setTimeout( () => {
		Fg.groupRemove(from, [Kick]).catch((e) => {console.log(`*ERROR:* ${e}`)}) 
					}, 1000)
		setTimeout( () => {
		reply(` No permitimos enlaces de otros grupos!\nLo siento *${pushname}* seras expulsado`)
		}, 0)
	}
	

//-- Anti user ban
if (isCmd && isBan) return reply(banned())

//-- Leer automáticamente si hay un mensaje
if (isCmd) Fg.chatRead(from)

//--Auto responder
switch(is) {
 
case 'bot':
buf = fs.readFileSync(`./mp3/bot.mp3`)
Fg.sendMessage(from, buf, audio, {
  mimetype: 'audio/mp4', quoted: mek, ptt: true
})
break
} 


//-- Comandos
switch(command) {
  
//-- List menu
case 'menu':
case 'help':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
	uptime = process.uptime()
  capt = `Total Hits : ${reqcmd} \n Clasificacion : \n Usuarios : ${_user.length}`
  thum = await fs.readFileSync('./image/fg.jpeg').toString('base64')
 if (args.length < 1) return replyimg(menu(tanggal, jam, pushname, sender, Fg, prefix, _user, uptime, isGroupAdmins, groupMetadata, groupAdmins, Welcome_, AntiLink_, isGroup, process), text, capt, thum)
  if (args[0] === '1' ) {
   return replyimg(menu1(prefix, tanggal, jam), text, capt, thum)
  } else if (args[0] === '2' ) {
    return replyimg(menu2(prefix, tanggal, jam), text, capt, thum)
 } else if (args[0] === 'owner' ) {
    return replyimg(menuOwner(prefix, tanggal, jam), text, capt, thum)
  } else if (args[0] === 'group' ) {
    return replyimg(menuGrup(prefix, tanggal, jam), text, capt, thum)
  }
          break

//-- información bot
case 'info':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  uptime = process.uptime()
  reply(info(Fg, uptime, process, wa_version, mcc, mnc, os_version, device_manufacturer, device_model))
					break

//-- velocidad de respuesta
case 'speed':
case 'ping':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
const timestamp = speed();
const latensi = speed() - timestamp
uptime = process.uptime()
reply(` *Velocidad* : ${latensi.toFixed(4)} _Segundos_`)
break

//-- Simsimi
case 'bot':
case 'simi':
if (!isVerify) return reply(userB(prefix))
		if (args.length < 1) return reply(`Hola ${pushname}`)
		sims = value
		simt = await fs.readFileSync('./img/fg.jpeg').toString('base64')
					try {
		anu = await fetchJson(`https://fdciabdul.tech/api/ayla/?pesan=${sims}`, {method: 'get'})
    jawab = anu.jawab
replyimg(jawab, text, sims, simt)
} catch (e) {
  reply(err())
  console.log('Error : %s', color(e, 'orange'))
}
break
  
//-- código deidiomas

case 'idiomas':
case 'idioma':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  reply(bahasa())
  break

//-- código postal países 
case 'kodebahasa':
  if (!isVerify) return reply(userB(prefix))
  reply(negara())
  break

//--- pregunta

case 'pregunta':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
if (args.length < 1) return reply(` Ejemplo: *${prefix}pregunta* soy feo?`)
apa = value
naon = ["Si","No","En efecto"," Tal vez","No lo se","Quizas","2 dias","Jamas", "Un domingo", "no lo hace", "es mas falso que el amor de ella"]
random = naon[Math.floor(Math.random() * (naon.length))]
apakah = `Pregunta : *${apa}*
Respuesta : ${random}`
reply(apakah)
break


//--- texto a voz
case 'tts': 
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  
				if (args.length < 1) return Fg.sendMessage(from, ` Ingrese el código de idioma y el texto\n\n*Ejemplo* : ${prefix}tts es Hola puercos`, text, {quoted: mek})
				const gtts = require('./lib/gtts')(args[0])
				if (args.length < 2) return Fg.sendMessage(from, ` Ingrese el texto\n\n*Ejemplo* : ${prefix}tts es Hola puercos`, text, {quoted: mek})
				dtt = body.slice(8)
				
				ranm = getRandom('.mp3')
				rano = getRandom('.ogg')
				dtt.length > 600
				? reply(' El texto es demasiado largo, tampoco de voy a leer la Biblia')
				: gtts.save(ranm, dtt, function() {
				exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
				fs.unlinkSync(ranm)
				buff = fs.readFileSync(rano)
				if (err) return reply(' Lo siento ocurrió un error')
				Fg.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
				fs.unlinkSync(rano)
				})
				})
break

//--- parejas 

case 'shipping':
    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf()) 
    if (!isGroup) return reply(group())
					jds = []
					meh = ["Putus","Jadian","Tunangan","Menikah","Cerai","Gelud","Ciuman di pinggir jalan"]
					yoyo = meh[Math.floor(Math.random() * meh.length)]
					jdii = groupMembers
					koss = groupMembers
					akuu = jdii[Math.floor(Math.random() * jdii.length)]
				 diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `
  *La pareja del dia*\n@${akuu.jid.split('@')[0]}\n\n@${diaa.jid.split('@')[0]}\n`
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break	

//--- guapo

case 'guapo':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `El mas *Guapo* del grupo es  @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- guapa
case 'guapa':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `La mas  *Hermosa* del grupo es @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- feo

case 'feo':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `El mas *Feo* del grupo es @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- chico triste 
case 'sadboy':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `El  *Chico triste* del grupo es @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- chica triste 
case 'sadgirl':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = `La *Chica triste* del grupo es @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break

//--- tag random
case 'random':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    if (!isGroup) return reply(group())
					jds = []
					 jdii = groupMembers
					 diaa = jdii[Math.floor(Math.random() * jdii.length)]
					teks = ` El usuario elegido al azar es @${diaa.jid.split('@')[0]}`
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break
//-- Piedra papel o tijera 
case 'suit':
case 'ppt':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isGroup) return reply(group())
					if (args.length < 1) return reply(` Seleccione piedra/papel/tijera\n\nEjemplo : *${prefix + command}* papel`)
					if (args[0] === 'tijera' ) {
					  gunting = [
					    "\nTu *Tijera*\nDyLux *Papel*\nGanaste\n",
					    "\nTu *Tijera*\nDyLux *Piedra*\nPerdiste F \n",
					    "\nTu *Tijera*\nDyLux *Tijera*\nEmpate \n"
					    ]
					  gun = gunting[Math.floor(Math.random() * gunting.length)]
					  reply(gun)
					} else if (args[0] === 'papel') {
					  ker = [
					    "\nTu *Papel*\nDyLux *Piedra*\nGanaste\n",
					    "\nTu *Papel*\nDyLux *Tijera*\nPerdiste \n",
					    "\nTu *Papel*\nDyLux *Papel*\nEmpate \n"
					    ]
					  kertas = ker[Math.floor(Math.random() * ker.length)]
						reply(kertas)
					} else if (args[0] === 'piedra') {
					  bat = [
					    "\nTu *Piedra*\nDyLux *Tijera*\nGanaste\n",
					    "\nTu *Piedra*\nDyLux *Papel*\nTe gane jsjs \n",
					    "\nTu *Piedra*\nDyLux *Piedra*\nEmpate \n"
					    ]
					  batu = bat[Math.floor(Math.random() * bat.length)]
					  reply(batu)
					} else {
					  reply(' Seleccione piedra/papel/tijera')
					}
break

//-- Verdad 

case 'verdad':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const verdad = _verdad[Math.floor(Math.random() * _verdad.length)]
  reply(` *Verdad*\n${verdad}`)
break

//-- Tod reto
case 'reto':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const reto = _reto[Math.floor(Math.random() * _reto.length)]
  reply(` *Reto*\n${reto}`)
break

//-- citas citas
case 'citas':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const citas = _citas[Math.floor(Math.random() * _citas.length)]
  reply(citas)
break

//-- frases motivacionales 
case 'motivacion':
case 'motivación':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const motivacion = _motivacion[Math.floor(Math.random() * _motivacion.length)]
  reply(motivacion)
break

//-- Tonterias
case 'tonterias':
case 'tonterías':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const tonteria = _tonteria[Math.floor(Math.random() * _tonteria.length)]
  reply(tonteria)
break

//-- hacker
case 'hacker':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const hacker = _hacker[Math.floor(Math.random() * _hacker.length)]
  reply(hacker)
break

//-- hechos - curiosidades 
case 'hechos':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  const hechos = _hechos[Math.floor(Math.random() * _hechos.length)]
  reply(hechos)
break


//--Frases

case 'frases':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
const pantunn =['La vida empieza cada cinco minutos','El amor inmaduro dice: "te amo porque te necesito". El amor maduro dice: "te necesito porque te amo"z','Lo que uno puede llegar a ser, uno debe serlo','El poder de la imaginación nos hace infinitos','¡Seamos realistas, pidamos lo imposible!','La libertad muere si no se usa','Donde las palabras fallan la música habla','No se puede encontrar la paz evitando la vida','La vida es como el jazz... mejor si es improvisada','Todo lo que se puede imaginar es real','El conocimiento es un antídoto para el miedo','El amor es un humo hecho con los vapores de los suspiros','Un buen viajante no tiene planes','Lo que no puedo crear, no lo entiendo','De las dificultades nacen milagros','El amor es un mejor maestro que el deber','La vida es la flor de la que el amor es la miel','Mira atrás y sonríe ante los peligros pasados','Vivimos en un arcoiris de caos','A veces el corazón ve lo que es invisible a los ojos','Donde hay amor hay vida','Una vez aceptamos nuestros límites, vamos más allá de ello','Escucha de vez en cuando; es fascinante lo que puedes llegar a oír','El placer es estropeado con frecuencia por el simple hecho de describirlo','El amor está compuesto por un alma habitando dos cuerpos','Cuanto más hacemos, más podemos hacer','El tiempo pasado en compañía de gatos nunca es tiempo malgastado','Un amigo es alguien con quien te atreves a ser tú mism']
const pengirim = pantunn[Math.floor(Math.random() * pantunn.length)]
Fg.sendMessage(from, pengirim, text, { quoted: mek })
break  

//-- link whatsapp
case 'wame':
case 'wa.me':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					reply(`*Link WhatsApp:* wa.me/${sender.split('@')[0]}\n*O*\napi.whatsapp.com/send?phone=${sender.split('@')[0]}`)
			break

//-- habla como el bot
case 'say':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
sendMess(from, value)
break

//-- copiar texto en imagen
case 'ocr':
  if (!isVerify) return reply(userB(prefix))

  if (isBanned) return reply(banf())
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
			const media = await Fg.downloadAndSaveMediaMessage(encmedia)
			
			reply(wait())
						await recognize(media, {lang: 'eng+es', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							  
							.catch(err => {
								reply(err(prefix))
								fs.unlinkSync(media)
							})
					} else {
						reply(' Responde o envía una imagen con texto')
					}
		break

//-- Convertir MP4 a mp3 
case 'tomp3':

                if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())

					if (!isQuotedVideo) return reply(' Responde a un video')
					reply(wait())
					
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Error al convertir video a mp3')
						bufferlkj = fs.readFileSync(ran)
						Fg.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
						  
					})
					
					break

//-- audio lento
case 'slow':
  if (!isQuotedAudio) return reply(' Responde a un audio')
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())

					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Fg.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
						  
					})
					
				break

//-- audio voz grueso 
case 'gemuk':
  if (!isQuotedAudio) return reply('Responde a un audio')
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Fg.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
						  
					})
					
				break

//-- tupai
case 'tupai':
  if (!isQuotedAudio) return reply('Responde a un audio')
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())

					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Fg.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
						  
					})
					
				break

//-- to vn
case 'tovn':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  if (!isQuotedAudio) return reply('Responde un audio')

					reply(wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('No se pudo convertir el audio a ptt')
						topt = fs.readFileSync(ran)
						Fg.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: mek, ptt:true})
						})
					break

//--- bass
case 'bass': 
  if (!isQuotedAudio) return reply('Responde un audio')
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())

					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Fg.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
						  
					})
					
				break

//--- nighcore
case 'nightcore':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
 //   if (!isPrem) return reply(premi())

	if (!isQuotedAudio) return reply('Responde un audio')
					night = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					core = await Fg.downloadAndSaveMediaMessage(night)
					ran = getRandom('.mp3')
					
					reply(wait())
					exec(`ffmpeg -i ${core} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(core)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						Fg.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:false, quoted: mek, ptt: true})
						fs.unlinkSync(ran)
						  
					   })
					
				       break

//-- add stiker
case 'gets': 
case 'getstick': 
case 'getstik':

if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
			  if (args.length < 1) return reply(`Ingrese el nombre de la pegatina, si no sabe vea la lista con *${prefix}liststick*`)
				stik = value
				try {
				result = fs.readFileSync(`./media/stick/${stik}.webp`)
				Fg.sendMessage(from, result, sticker, selepbot)
				} catch {
				  reply(' El paquete no esta registrado')
				}
				 
				break

//--- Lista de Stickers guardados
case 'liststik':
case 'liststick':
case 'liststicker':
case 'liststickers':
			if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
		teks = ` *STICKER PACK*\nUsa el comando *${prefix}gets* para usar una pegatina\n*Total* : ${_stik.length}\n *LISTA* \n`
	    for (let stik of _stik) {
	    teks += ` ${stik}\n`
					}
	    teks += ``
	    reply(teks.trim())
				break

//-- añadir stickers
case 'addstik':
case 'addstick':
case 'addsticker':
case 'addstickers':
				if (!isQuotedSticker) return reply('Responde a un stikers')
				if (!isOwner) return reply(ownerB())
				stik = value
				if (!stik) return reply('Ponle un nombre al sticker')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Fg.downloadMediaMessage(boij)
				_stik.push(`${stik}`)
				fs.writeFileSync(`./media/stick/${stik}.webp`, delb)
				fs.writeFileSync('./media/stik.json', JSON.stringify(_stik))
				Fg.sendMessage(from, ` La pegatina se añadio con exito\npara comprobar escriba ${prefix}liststick`, MessageType.text, { quoted: mek })
				 
				break

//--- menambah vn
case 'addvn':
				if (!isQuotedAudio) return reply(' Responde  a un adio')
				if (!isOwner) return reply(ownerB())
				vn = value
				if (!vn) return reply(' Nombre del audio?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Fg.downloadMediaMessage(boij)
				_vn.push(`${vn}`)
				fs.writeFileSync(`./media/audio/${vn}.mp3`, delb)
				fs.writeFileSync('./media/vn.json', JSON.stringify(_vn))
				Fg.sendMessage(from, ` El audio se guardo\nPara ver la lista use ${prefix}listvn`, MessageType.text, { quoted: mek })
				 
				break

//--- mengambil vn
case 'getvn':

if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
			  if (args.length < 1) return reply(`Tambien ingrese el nombre vn en ${prefix}listvn`)
				vn = value
				try {
				buffer = fs.readFileSync(`./media/audio/${vn}.mp3`)
				Fg.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
				} catch {
				  reply(' No se encontro el audio')
				}
				 
				break

//-- list vn
case 'listvn':
case 'vnlist':

if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
      teks = `  *PACK AUDIOS*\nPara usar escriba *${prefix}getvn* escoje una de la lista de audios\n*Total* : ${_vn.length}\n *LISTA* \n`
	    for (let vn of _vn) {
	    teks += ` ${vn}\n`
					}
	    teks += ``
	    reply(teks.trim())
				break

//-- Añadir una imagen
			case 'addimg':
				if (!isQuotedImage && isMedia) return reply('Responde una imagen')
				if (!isOwner) return reply(ownerB())
				img = value
				if (!img) return reply('Pon un nombre a la imagen')
				fto = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Fg.downloadMediaMessage(fto)
				_img.push(`${img}`)
				fs.writeFileSync(`./media/foto/${img}.jpeg`, delb)
				fs.writeFileSync('./media/image.json', JSON.stringify(_img))
				Fg.sendMessage(from, ` Se guardo la imagen\nPara ver escriba *${prefix}listimg*`, MessageType.text, { quoted: mek })
				 
				break

//--- Enviar una imagen guardada
			case 'getimg':
			
			if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
			  if (args.length < 1) return reply(` Escribe el nombre de la imagen, para ver la lista use *${prefix}listimg*`)
				img = value
				try {
				buffer = fs.readFileSync(`./media/foto/${img}.jpeg`)
				Fg.sendMessage(from, buffer, image, { quoted: mek })
				} catch {
				  reply(' El paquete no está registrado')
				}
				 
				break

//--- lista de imágenes
			case 'listimg':
			if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				teks = `  *PACK IMAGENES*\n Para enviar una imagen use *${prefix}getimg* Toma una imagen\n*Total* : ${_img.length}\n *LISTA* \n`
	    for (let img of _img) {
	    teks += ` ${img}\n`
					}
	    teks += ``
	    reply(teks.trim())
				break

//--- Añadir videos
			case 'addvid':
			  if (!isOwner) return reply(ownerB())
				if (!isQuotedVideo && isMedia) return reply('Responde a un video')
				vid = value
				if (!vid) return reply('Dale un nombre al video')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await Fg.downloadMediaMessage(boij)
				_vid.push(`${vid}`)
				fs.writeFileSync(`./media/video/${vid}.mp4`, delb)
				fs.writeFileSync('./media/vid.json', JSON.stringify(_vid))
				Fg.sendMessage(from, ` El video se guardo correctamente\nPara ver escriba *${prefix}listvid*`, MessageType.text, { quoted: mek })
				
				break

//--- Usar un video guardado
			case 'getvid':
			  if (args.length < 1) return reply(`Ingrese el nombre del video, aqui una lista *${prefix}listvid*`)
				vid = value
				try {
				buffer = fs.readFileSync(`./media/video/${vid}.mp4`)
				Fg.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
				} catch {
				  reply('No se encontro el video')
				}
				 
				break

//--lista de vídeos 
			case 'listvid':
			if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				teks = `  *VIDEO PACK*\nPara enviar un video use *${prefix}getvid* nombre video\n*Total* : ${_vid.length}\n *LISTA* \n`
	    for (let vid of _vid) {
	    teks += ` ${vid}\n`
					}
	    teks += ``
	    reply(teks.trim())
				 
				break

//-- sticker maker
case 'stiker': 
case 's': 
case 'stikergif':
case 'sticker': 
case 'stickergif': 
case 'sgif':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await Fg.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('DyLux', 'FG98')} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(stick())
									Fg.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await Fg.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(` Falló, en el momento de la conversión ${tipe} a la pegatina`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('DyLux', 'FG98')} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(stick())
									Fg.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(` Envia una imagen con *${prefix + command}* o etiqueta una imagen que se haya enviado\n*Videos 1-9 segundos*`)
					}
					break

//-- stiker a image

					
					case 'toimg':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isQuotedSticker) return reply(' Responde a un sticker')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await Fg.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('  Error al convertir pegatinas en imagenes ')
						buffer = fs.readFileSync(ran)
						Fg.sendMessage(from, buffer, image, {quoted: mek, caption: ' Aqui tienes'})
						fs.unlinkSync(ran)
					})
					break
					

//-- Dueño del bot
case 'owner':
case 'creator':
case 'creador':

    nomor = '59172945992@s.whatsapp.net'
    owner = await fs.readFileSync('./image/fg.jpeg').toString('base64')
    capt = "Desarrollador\nIg: fg98._\nBOT : DyLux"
    const been = {
    text: ` @${nomor.split("@")[0]} Aqui mi dueño, solo chatea si es necesario`,
  contextInfo: {
mentionedJid: [nomor]
  }
}
replyimg(been, text, capt, owner)
break

//--borrar chats del bot
case 'clearchat':
		if (!isOwner) return reply(ownerB())
		anu = await Fg.chats.all()
		list_chat = await Fg.chats.all()
    for (let chat of list_chat) {
    Fg.modifyChat(chat.jid, "delete")
    }
    reply(" borre todos mis chats")
   break

//-- mencionar a todos los miembros
case 'mentionall': 
case 'tagall':
      if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
		  if (!isGroup) return reply(group())
			if (!isGroupAdmins && !isOwner) return reply(admin())
					members_id = []
		teks = ` Grupo : *${groupName}*\n Miembros : *${groupMetadata.participants.length}*\n Mensaje : ${value}\n *MENCIONES* \n`
			for (let mem of groupMembers) {
				teks += ` @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
		teks += ` Dylux   `
			mentions(teks, members_id, true)
			break

//-- Lista de Bloqueados
case 'blocklist':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
      teks = `  *BLOQUEADOS*\nLos siguientes números son una lista de números bloqueados por infringir las reglas y enviar spam al Bot\n\n*Total* : ${blocked.length}\n *LISTA* \n`
	    for (let block of blocked) {
	    teks += ` @${block.split('@')[0]}\n`
					}
	    teks += ``
	    Fg.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break


case 'ban':
				if (!isOwner) return reply(ownerB())
				if (args.length < 1) return reply(` A quien quieres que banee?`)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
					ban.push(bnnd)
					fs.writeFileSync('./data/banned.json', JSON.stringify(ban))
					
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
					} else {
						mentions(` @${mentioned[0].split('@')[0]} ha sido baneado!\n\nEste usuario no podrá volver a usar mis comandos`, mentioned, true)
					}
					
					break
				
		        case 'unban':
				if (!isOwner) return reply(ownerB())
				if (args.length < 1) return reply(` Menciona al usuario para desbanear!`)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				bnnd = body.slice(7)
				ban.splice(`${bnnd}@s.whatsapp.net`, 1)
				fs.writeFileSync('./data/banned.json', JSON.stringify(ban))
				
				if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
					} else {
						mentions(` @${mentioned[0].split('@')[0]} ha sido Desbaneado`, mentioned, true)
					}
					break 

//-- Lista de baneados por el bot
case 'banlist':
  if (!isVerify) return reply(userB(prefix))
      teks = `  *BANEADOS*\nLos siguientes números son una lista de números baneados por infringir las reglas o enviar spam al Bot\n\n*Total* : ${ban.length}\n *LISTA* \n`
	    for (let baned of ban) {
	    teks += ` @${baned.split('@')[0]}\n`
					}
	    teks += ``
	    Fg.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": ban}})
					break

//-- Reportes
case 'report':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
report = `   *INFORMACION*
Solicite e informe las funciones de error en el bot, asegúrese de proporcionar un informe correcto y claro !

 *REPORTES* 
 *${prefix}Solicitud (Texto)*
 *${prefix}Informe (Texto)*


*Total*
Solicitudes : ${_solicitud.length}
Informes : ${_informe.length}

 o puede ponerse en contacto con el propietario para obtener más información.`
reply(report)
break


//--- Pedidos solicitud
case 'pedido':
case 'solicitud':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  yoi = value
  if (args.length < 1) return reply(' Ingrese las funciones que desee en el Bot *DyLux*')
  if (yoi.length > 200 ) return reply('El texto supera el límite, su solicitud es rechazada !')
  _solicitud.push(yoi)
  fs.writeFileSync('./report/solicitud.json', JSON.stringify(_solicitud))
  reply(` Gracias *${pushname}*, Su solicitud ha sido almacenada en la base de datos.`)
  
	break

//--- informes - bugs 

case 'informe':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  yoi = value
  if (args.length < 1) return reply(' Ingrese el nombre de la función de error que ocurre cuando la prueba')
  if (yoi.length > 200) return reply('El texto supera el límite, su solicitud es rechazada!')
  _informe.push(yoi)
  fs.writeFileSync('./report/informe.json', JSON.stringify(_informe))
  reply(` Gracias *${pushname}*, Su informe se ha almacenado en la base de datos`)
	break

//-- lista de informes 
case 'verinformes':
case 'informes':
			if (!isOwner) return reply(ownerB())
				teks = `  *INFORMES*\nLa siguiente es una lista de informes recibidos en la fecha *${tanggal()}* con la cantidad de informes *${_informe.length}*\n\n *LISTA* \n`
				for (let lap of _informe) {
					teks += ` ${lap}\n`
				}
				teks  += ``
				reply(teks.trim())
				break

//-- lista de solicitudes
case 'versolicitudes':
case 'solicitudes':
			if (!isOwner) return reply(ownerB())
				teks = `  *SOLICITUDES*\nLa siguiente es una lista de solicitudes recibidas en la fecha *${tanggal()}* con la cantidad de solicitudes *${_solicitud.length}*\n\n *LISTA* \n`
				for (let req of _solicitud) {
					teks += ` ${req}\n`
				}
				teks  += ``
				reply(teks.trim())
				break

//--- Lista de administradores del grupo
case 'adminlist':
case 'listadmin':
case 'staff':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isGroup) return reply(group())
					teks = ` *STAFF DEL GRUPO* _${groupMetadata.subject}_\nTotal : ${groupAdmins.length}\n\n\n`
			
					for (let admin of groupAdmins) {
						teks += ` @${admin.split('@')[0]}\n`
					}
					teks += ` Dylux   `
					mentions(teks, groupAdmins, true)
					break

case 'listonline':
case 'online':
case 'enlinea':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  if (!isGroup) return reply(group())
  if (isLimit(sender)) return reply(fdiama(prefix))
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
        reply(pagado())
			    let online = [...Object.keys(Fg.chats.get(ido).presences), Fg.user.jid]
			    Fg.sendMessage(from, 'En linea:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n` + `\n*©POWERED BY Dylux  *`, text, { quoted: mek,
  			  contextInfo: { mentionedJid: online }
    
			    })
			    await limitAdd(sender)
				break

//--- abrir y cerrar grupo
					case 'grup':
					case 'grupo':
					case 'group':
					if (!isVerify) return reply(userB(prefix))
                    if (isBanned) return reply(banf())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply(`Para abrir grupo : *${prefix}group* open\npara cerrar grupo : *${prefix}group* close`)
					if (args[0] === 'open') {
					    reply(` Grupo abierto ahora *todos los participantes* pueden escribir`)
						Fg.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'close') {
						reply(` Grupo cerrado ahora *solo los admin* pueden escribir`)
						Fg.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
					
	
//--- Añadir a un usuario al grupo
case 'add':
				  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply(' Ingrese el número')
					if (args[0].startsWith('08')) return reply('Use código de país')
					if (args[0].startsWith('+5')) return reply(' Use el código de país sin +')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						Fg.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply(' No se pudo agregar, tal vez porque es privado')
					}
					break

//--- Eliminar a un miembro
case 'kick':
			    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
			 // if (!isOwner) return reply('* Comando en mantenimiento* ')
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('A quien quieres que elimine? mencionalo ')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ' Órdenes recibidas, emitidas :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Fg.groupRemove(from, mentioned)
					} else {
						mentions(` Ordenes recibidas, emitidas : @${mentioned[0].split('@')[0]}`, mentioned, true)
				 Fg.groupRemove(from, mentioned)
					}
					break

//-- Dar admin 
case 'promote':
case 'promover':
case 'rol':
				  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply(' Mencione al usuario para promoverlo a administrador')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ' Pedidos recibidos, te conviertes en administrador :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Fg.groupMakeAdmin(from, mentioned)
					} else {
						mentions(` Ahora @${mentioned[0].split('@')[0]} Es un admin del grupo *${groupMetadata.subject}*`, mentioned, true)
						Fg.groupMakeAdmin(from, mentioned)
					}
					break


//-- Bajar posiciones - quitar admin
case 'demote':
case 'degradar':
case 'delrol':
			    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Menciona al al usuario para degradarlo')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ' Pedido recibido, puesto de administrador degradado :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						Fg.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(` Admin degradado : @${mentioned[0].split('@')[0]} Se convierte en miembro, Lo sentimos `, mentioned, true)
						Fg.groupDemoteAdmin(from, mentioned)
					}
		break

//-- link del grupo
case 'linkgroup':
case 'linkgrupo':
case 'link':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				if (!isGroup) return reply(group())
				if (!isBotGroupAdmins) return reply(Badmin())
				linkgc = await Fg.groupInviteCode (from)
				yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink del Grupo *${groupName}*`
				Fg.sendMessage(from, yeh, text, {quoted: mek})
				break

//-- Notification al grupo
case 'notif':
case 'notify':
if (!isGroup) return reply(group())
    if (!isGroupAdmins && !isOwner) return reply(admin())
    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
    
    if (args.length < 1) return reply(`Cual es el mensaje?`)
    teks = `Anuncio de  @${sender.split("@")[0]}\n*Mensaje* : ${value}`
    gc = await Fg.groupMetadata(from);
    member = gc['participants']
    jids = [];
    member.map(async adm => {
  jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
  text: teks,
  contextInfo: {
mentionedJid: jids
  },
  quoted: mek
}
await Fg.sendMessage(from, options, text)
break

//Hidetag 
case 'hidetag':
         reply(` Intenta de nuevo con:\n\n*${prefix}Here*`)
         break
         
case 'here':
    if (!isGroup) return reply(group())
    if (!isGroupAdmins && !isOwner) return reply(admin())
    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())

    teks = body.slice(6)
    gc = await Fg.groupMetadata(from);
    member = gc['participants']
    jids = [];
    member.map(async adm => {
  jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
  text: teks,
  contextInfo: {
mentionedJid: jids
  },
  quoted: mek
}
await Fg.sendMessage(from, options, text)
break



//-- Bot sale del grupo
case 'leave': 
case 'salir':

    if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				if (!isGroup) return reply(group())
				    if (!isGroupAdmins && !isOwner) return reply(admin())
				anu = await Fg.groupLeave(from, `Adios *${groupMetadata.subject}*`, groupId)
				break

//-- cambie icono del grupo
case 'setppgc':
case 'seticongp':
case 'seticon':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				if (!isGroup) return reply(group())
				if (!isGroupAdmins && !isOwner) return reply(admin())
				if (!isBotGroupAdmins) return reply(Badmin())
				if (!isQuotedImage && isMedia) return reply('Responde la foto que quieres hacer del perfil del grupo')
				try {
				media = await Fg.downloadAndSaveMediaMessage(mek)
				await Fg.updateProfilePicture (from, media)
				reply(wait())
				reply(`  La foto de perfil del grupo se modificó correctamente *${groupMetadata.subject}*`)
				} catch (e) {
				  reply('Lo siento ocurrió un error inesperado')
				}
			break

//-- Clona un perfil para el bot
case 'clone':
case 'clonar':
        if (!isOwner) return reply(ownerB())
		if (!isGroup) return reply(group())
		if (!isGroupAdmins) return reply(admin())
		if (args.length < 1) return reply(' Menciona a quien quieres que clone su perfil ')
		if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Menciona a quiere quieres que clone su perfil ')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await Fg.getProfilePicture(id)
						buffer = await getBuffer(pp)
						Fg.updateProfilePicture(botNumber, buffer)
						mentions(` Foto de perfil actualizada correctamente usando la foto de perfil de : @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(' Lo siento ocurrio un error')
					}
		break

//-- Transmite el mensaje con todos los usuarios y grupos 
                case 'bc':
					case 'tx': 
					 if (!isOwner) return reply(ownerB())
					if (args.length < 1) return reply(' Que quieres transmitir?')
					anu = await Fg.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await Fg.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							Fg.sendMessage(_.jid, buff, image, {caption: `*TRANSMISIÓN  STAFF*\n\n\n${body.slice(4)}`})
						}
						reply('* Transmision realizada* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*TRANSMISIÓN  STAFF*\n\n\n${body.slice(4)}`)
						}
						reply('* Transmision realizada* ')
					}
					break
					
					


//-- Total usuarios
case 'totaluser':
case 'totalusuarios':
  if (!isOwner) return reply(ownerB())
					teks = ` Usuarios Verificados\n Total Usuarios : *${_user.length}*\n\n`
					no = 0
					for (let hehehe of _user) {
						no += 1
						teks += ` @${hehehe.split('@')[0]}\n`
					}
					teks += ` *${Fg.user.name}* `
					Fg.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": _user}})
					break

//-- Eliminar mensaje del bot
case 'delete':
case 'del':

if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (!isGroup)return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					try {
					Fg.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					} catch (e) {
					  reply(' *Solo puedo borrar mensajes míos*')
					}
					break

//--- verify
//--- verificación  api funciona
case 'verify':
case 'reg':
case 'verificar':
case 'register':
case 'daftar': 
			if (isVerify) return reply('* Tu ya te has verificado  *')
					
				_user.push(sender)
fs.writeFileSync('./data/user.json', JSON.stringify(_user))
try {
ppimg = await Fg.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}

			capt = ` *VERIFICADO* 
 *Nombre:* _${pushname}_
 *Num:* _wa.me/${sender.split("@")[0]}_
 *Hora:* _${jam}_
 *Usuarios Verificados:* _${_user.length}_
 *${Fg.user.name}* 
\nVerificación completa usa *${prefix}Help* para ver el Menu`

daftarimg = await getBuffer(ppimg)
Fg.sendMessage(from, daftarimg, image, {quoted: mek, caption: capt})
break
                
                
//--- Bienvenida on/off
case 'welcome':
case 'bv':
case 'bienvenidas':
case 'bienvenida':
  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
		if (!isGroup) return reply(group())
		if (!isGroupAdmins && !isOwner) return reply(admin())
		if (args.length < 1) return reply(` *BIENVENIDAS*\n\n*${prefix + command} 1* para activar\n*${prefix + command} 0* para desactivar`)
		if ((args[0]) === '1') {
		if (isWelcom) return reply(' Bienvenida ya esta activa')
						_welcom.push(from)
						fs.writeFileSync('./data/welcom.json', JSON.stringify(_welcom))
						reply(` La función de bienvenida se activo en el grupo *${groupMetadata.subject}*`)
		} else if ((args[0]) === '0') {
		if (!isWelcom) return reply(' Bienvenida ya esta desactivada')
						_welcom.splice(from, 1)
						fs.writeFileSync('./data/welcom.json', JSON.stringify(_welcom))
						reply(` La función de Bienvenida se desactivo en el grupo *${groupMetadata.subject}*`)
					} else {
						reply(` *BIENVENIDAS*\n\n*${prefix + command} 1* para activar\n*${prefix + command} 0* para desactivar`)
					}
		break

//--- on/off antilink WhatsApp 
				case 'antilink':
				case 'antilinkwha':
				case 'antilinkwhatsapp':
				if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
				if (!isGroup) return reply(group())
					if (!isGroupAdmins && !isOwner) return reply(admin())
					if (!isBotGroupAdmins) return reply(Badmin())
					if (args.length < 1) return reply(` *ANTILINK WHATSAPP*\n\n*${prefix + command} 1* para activar\n*${prefix + command} 0* para desactivar`)
					if ((args[0]) === '1') {
						if (isAnti) return reply(' Antilink ya está activo')
						_antilink.push(from)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(_antilink))
						reply(` Se activo el *Antilink WhatsApp* en el grupo *${groupMetadata.subject}*`)
					} else if ((args[0]) === '0') {
						if (!isAnti) return reply(' Antilink ya está desactivado')
						_antilink.splice(from, 1)
						fs.writeFileSync('./data/antilink.json', JSON.stringify(_antilink))
						reply(` Se desactivo el *Antilink WhatsApp* en el grupo *${groupMetadata.subject}*`)
					} else {
						reply(` *ANTILINK WHATSAPP*\n\n*${prefix + command} 1* para activar\n*${prefix + command} 0* para desactivar`)
					}
					break

//--- añadir reto 

case 'addreto':
  if (!isOwner) return reply(ownerB())
  dar = value
  if (args.length < 1) return reply(' Escribe el texto')
  _reto.push(dar)
  fs.writeFileSync('./result/reto.json', JSON.stringify(_reto))
  reply(` Hecho`)
  break

//--- añadir motivacion

case 'addmotivacion':
case 'addmotivación':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply(' Escribe el texto')
  _motivacion.push(stat)
  fs.writeFileSync('./result/motivacion.json', JSON.stringify(_motivacion))
  reply(` Hecho`)
  break

//--- añadir hechos 

case 'addhecho':
case 'addhechos':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply(' Escribe el texto')
  _hechos.push(stat)
  fs.writeFileSync('./resutl/hechos.json', JSON.stringify(_hechos))
  reply(` Hecho`)
  break

//--- añadir citas

case 'addcita':
case 'addcitas':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply(' Escribe el texto')
  _citas.push(stat)
  fs.writeFileSync('./result/citas.json', JSON.stringify(_citas))
  reply(` Hecho`)
  break

//--- añadir tonterías 

case 'addtonteria':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply(' Escribe el texto')
  _tonteria.push(stat)
  fs.writeFileSync('./result/tonteria.json', JSON.stringify(_tonteria))
  reply(` Hecho`)
  break

//--- añadir hacker
case 'addhacker':
  if (!isOwner) return reply(ownerB())
  stat = value
  if (args.length < 1) return reply(' Escribe el texto')
  _hacker.push(stat)
  fs.writeFileSync('./result/hacker.json', JSON.stringify(_hacker))
  reply(` Hecho`)
  break


//-- Termux
case 'termux':
  if (!isOwner) return reply(ownerB())
	const cmd = value
  if (args.length < 1) return reply(termux())
	exec(cmd, (err, stdout) => {
	if(err) return Fg.sendMessage(from, `*Root Term*\n ${err}`, text, { quoted: mek })
	if (stdout) {
	Fg.sendMessage(from, stdout, text)
		}
	})
break

case 'ttp':  
                  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())     
                    if (args.length < 1) return reply(` _Envie el texto_\n\nEjemplo *${prefix}ttp* DyLux`)
                    reply(wait())
                    F = body.slice(5)
                    anu1 = await getBuffer(`https://lolhuman.herokuapp.com/api/ttp?apikey=${lolkey}&text=${F}`)
                    Fg.sendMessage(from, anu1, sticker, {quoted: mek})
                    break
                    
                    case 'ttp':  
                  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())     
                    if (args.length < 1) return reply(` _Envie el texto_\n\nEjemplo *${prefix}ttp* DyLux`)
                    reply(wait())
                    F = body.slice(5)
                    anu1 = await getBuffer(`https://lolhuman.herokuapp.com/api/ttp?apikey=${lolkey}&text=${F}`)
                    Fg.sendMessage(from, anu1, sticker, {quoted: mek})
                    break
                    
                    case 'attp':
	              if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (args.length < 1) return reply(` _Envie el texto_\n\nEjemplo *${prefix + command}* DyLux`)
					  reply(wait())
					
					var teks = encodeURIComponent(args.join(' '))
					const attp = await getBuffer(`https://api.xteam.xyz/attp?file&text=${teks}`)
					Fg.sendMessage(from, attp, sticker, {quoted: mek, contextInfo: {"forwardingScore": 999, "isForwarded": true}})
break
					
					case 'attp2':  
                  if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())     
                    if (args.length < 1) return reply(` _Envie el texto_\n\nEjemplo *${prefix + command}* DyLux`)
                    reply(wait())
                    F = body.slice(7)
                    anu1 = await getBuffer(`https://lolhuman.herokuapp.com/api/attp?apikey=${lolkey}&text=${F}`)
                    Fg.sendMessage(from, anu1, sticker, {quoted: mek})
                    break
                    
                    //descargar imgane 

   case 'image':
   case 'imagen':
   case 'img':
            if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
if (args.length < 1) return reply(' Que quieres que busque?')
            const gimg = args.join('');
            try {
            reply(wait())
            gis(gimg, async (error, result) => {
            n = result
            images = n[Math.floor(Math.random() * n.length)].url
            Fg.sendMessage(from,{url:images},image,{quoted: mek, caption: ` Aqui tienes : *${gimg}*`})
            });
            } catch {
  	reply(mess.ferr)
  }
   break
   
      //nombre free fire 
		case 'nickff':
		if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
	Fg.updatePresence(from, Presence.composing) 
	data = await fetchJson(`https://api.zeks.xyz/api/nickepep?apikey=apivinz`, {method: 'get'})
	teks = '=================\n'
	for (let i of data.result) {
	teks += `*Nick* : ${i}\n=================\n`
					}
	reply(teks.trim())
	break 
	
	  //chat leer más 
  case 'leermas':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
Fg.updatePresence(from, Presence.composing)
if (args.length < 1) return reply(` Entrada de texto\nEjem : ${prefix + command} hola= que hacen`)
tels = body.slice(9)
var teks1 = tels.split("=")[0];
var teks2 = tels.split("=")[1];
hasil = `${teks1}${teks2}`
Fg.sendMessage(from, hasil, text, {
  quoted: mek
})
break 
case 'play':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
  if (args.length < 1) return reply(' *Ingresa el título de una canción*')
  reply(wait())
  
  play = body.slice(6)
  try {
  anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=shanduy20`)  /*api = apivinz*/
  if (anu.error) return reply(anu.error)
  infomp3 = `*Musica encontrada*\n\n *Título* : ${anu.result.title}\n *Fuente* : ${anu.result.source}\n *Tamaño* : ${anu.result.size}\n\n_ Enviando archivos, espere si el audio no aparece, descargue aquí._\n\n * Link* : ${anu.result.url_audio} `
  buffer = await getBuffer(anu.result.thumbnail)
  lagu = await getBuffer(anu.result.url_audio)
  Fg.sendMessage(from, buffer, image, {
quoted: mek, caption: infomp3
  })
  
  Fg.sendMessage(from, lagu, audio, {
mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek })
  
  } catch {
    reply(mess.ferr)
  }
  break

  
               
             //yt descargas 
             case 'ytmp3':
              if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (args.length < 1) return reply(` Use en comando más el link de YouTube\n\n Ejemplo: *${prefix + command}* https://www.youtube.com/watch?v=_aelrhBsIRE`)
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					reply(wait())
					
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/yta2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `* Descarga Completa*\n\n *Título* : ${anu.title}\n\n_ Enviando archivos._`
					thumb = await getBuffer(anu.thumb)
					Fg.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					Fg.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'ytmp4':
				 if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
					if (args.length < 1) return reply(` Use en comando más el link de YouTube\n\n Ejemplo: *${prefix + command}* https://www.youtube.com/watch?v=_aelrhBsIRE`)
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					reply(wait())
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `* Descarga Completa*\n\n *Título* : ${anu.title}\n\n_ Enviando archivos._`
					thumb = await getBuffer(anu.thumb)
					Fg.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					Fg.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
					
					//--fake reply
//case 'fitnah':
case 'fake':
if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
if (!isGroup) return reply(group())
if (args.length < 1) return reply(` *Uso del comamdo* :\n${prefix}fake @tag=msj=msjbot\n\n *Ejemplo* : \n${prefix}fake @tagmember=hola=hola que hace`)
var gh = body.slice(7)

mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
var replace = gh.split("=")[0];
var target = gh.split("=")[1];
var bot = gh.split("=")[2];
Fg.sendMessage(from, `${bot}`, text, {
  quoted: {
key: {
  fromMe: false, participant: `${mentioned}`, ...(from ? {
remoteJid: from
  }: {})
}, message: {
  conversation: `${target}`
}}})
break

case 'dueñogrupo':
  case 'dueñogp':
 case 'ownergroup':
		case 'creadorgrupo':
		case 'ownergp':
		if (!isVerify) return reply(userB(prefix))
  if (isBanned) return reply(banf())
if (!isGroup) return reply(group())
 Fg.updatePresence(from, Presence.composing)
   options = {
    text: ` Este es el número del Creador de grupo : wa.me/${from.split("-")[0]}`,
   contextInfo: { mentionedJid: [from] }
    }
   Fg.sendMessage(from, options, text, { quoted: mek } )
				break	
				
				

//---- view web
	case 'view':
  case 'fetch':
  case 'result':
  if (!isOwner) return reply(ownerB())
teks = args.join(` `)
let res = await fetchText(teks)
reply(res)
break


   
				default:
}
	})
}
starts()

//-- More ? Tambahin sendiri