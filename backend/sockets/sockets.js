
module.exports = {
	__init__ : () =>{
		io.on('connection',(socket) =>{
            
            console.log('---------------New Connection Found-----------');

        });
	}
}
