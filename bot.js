// Import the discord.js module
const discord = require('discord.js');

var auth = require('./auth.json');//token
var frases = require('./frases.json');//frases 

// Create an instance of Discord that we will use to control the bot
const bot = new discord.Client();


// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Hello World!');
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;

    // It will listen for messages that will start with `!`
    if (message.content.indexOf('!') === 0) {
    	const args = message.content.slice(1).trim().split(/ +/g);//lo que va detrás del comando.
		const cmd = args.shift().toLowerCase();//comando 
        
       switch(cmd) {
            case 'saluda':
            	if (args[0] == 'a'){//si se pone saluda a @member, le dice hola a ese usuario.
            		let member = message.mentions.members.first();
            		message.channel.send('Hola ' + member + ' es un placer saludarte');
            	}else{//devuelve un saludo al azar
            		//los saludos en el fichero frases.json
            		var iNum = Math.floor((Math.random()* frases.saludos.num));
            		const sSaludo = frases.saludos.frases[iNum];
                	message.channel.send(sSaludo);
            	}
                break;
            case 'azote': //devuelve un proverbio al azar
            	//los castigos en el fichero frases.json
            	var iNum = Math.floor((Math.random()*frases.castigos.num));
            	const sQueja = frases.castigos.frases[iNum];
            	message.channel.send(sQueja + message.author);
            	break;
			case 'aconsejame': //devuelve un sonido de castigo
            	//los proverbios en el fichero frases.json
            	var iNum = Math.floor((Math.random()*frases.proverbios.num));
            	const sConsejo = frases.proverbios.frases[iNum];
            	message.channel.send(sConsejo);
            	break;
			case 'normas': //muestra imagen de las normas
				const embed = new discord.RichEmbed()
					.setTitle("Normas")
					.setImage("https://cdn.discordapp.com/attachments/223927015386906624/361824453820416000/REGLAS_SERVIDOR2.jpg");
                message.channel.send({embed});
                break;
			case 'gruñe': 
                message.channel.send('Grrrr!');
                break;
            case 'repite'://repite la misma frase después del comando 
            	const strMensaje = args.join(" ");
                // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    			message.delete().catch(O_o=>{}); 
    			// And we get the bot to say the thing: 
				message.channel.send(strMensaje);
                break;   
            // Just add any case commands if you want to..
         }
     }
     //Si dices hola, el te contesta.
     //if (message.content.toLowerCase().indexOf('hola') === 0) {
     //	message.channel.send("Saludos " + message.author );	
     //}
});
//llega un nuevo usuario al cana general
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send('Bienvenido al servidor, ' + member + ' Presentate al grupo para poder asignarte un rol, hecha un vistazo a las normas y pásalo muy bien!!');
});

bot.login(auth.token);
