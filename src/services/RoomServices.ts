import instance from "../axios";


class RoomServices{

    async createRoom(hostName: string, gameType: string){
        try {
            const room = await instance.post('/room/create', { hostName, gameType })
            return room.data
        } catch (error){
            console.log(`ERROR: ${error}`)
        }
    }

    async joinRoom(user: string, roomId: string){
        try {
            await instance.post('/room/join', { user, roomId })
        } catch (error){
            console.log(`ERROR: ${error}`)
        }
    }

    async leaveRoom(user: string, roomId: string){
        try {
            await instance.post('/room/leave', { user, roomId })
        } catch (error){
            console.log(`ERROR: ${error}`)
        }
    }

    async getAll(){
        try {
            const resp = await instance.get('/room/getAll')
            return resp.data
        } catch (error){
            console.log(`ERROR: ${error}`)
        }
    }

    async getOne(roomId: string){
        try {
            const resp = await instance.get('/room/getOne', {
                params: {
                    roomId: roomId
                }
            })
            return resp.data
        } catch (error){
            console.log(`ERROR: ${error}`)
        }
    }

}

export default new RoomServices()