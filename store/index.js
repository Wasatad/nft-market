import Vuex from 'vuex'
import { uid } from 'uid'
import { LoremIpsum } from 'lorem-ipsum'
const lorem = new LoremIpsum()

const store = () => {
  return new Vuex.Store({
    state: {
      nftItems: [],
      popularNFTs: [],
      currentNft: null,
      userBids: [],
      itemsWithActiveTimer: [],
      mobileMenuOpened: false,
    },
    mutations: {
      setCurrentItem(state, item) {
        state.currentNft = { ...item }
      },
      toggleFav(state, id) {
        let item = state.nftItems.find((item) => {
          return item.id == id
        })
        item.favorite = !item.favorite
      },

      toggleFavCurrent(state) {
        state.currentNft.favorite = !state.currentNft.favorite
      },

      //Timer for all NFT`s on main
      timer(state, id) {
        let item = state.nftItems.find((item) => {
          return item.id == id
        })
        item.timeTillTheEnd -= 1000
      },

      //Timer for current NFT
      currentTimer(state, id) {
        if (state.currentNft.id == id) {
          state.currentNft.timeTillTheEnd -= 1000
        }
      },
      setNewTimingItem(state, id) {
        state.itemsWithActiveTimer.push(id)
      },
      setNewCurrentPrice(state, price) {
        state.currentNft.price = price
        state.currentNft.bidsHistory.push(price)
        state.userBids.push(state.currentNft.id)
        //Проверить каждый из двух массивов на главной. Если в массиве есть такой NFT - обновить его стоимость
      },

      activateCountingState(state, id) {
        let item = state.nftItems.find((item) => {
          return item.id == id
        })
        item.countingInAction = true
        if (!item.timeTillTheEnd) {
          item.timeTillTheEnd = item.expireTimestamp
        }
      },
      toggleMobileMenu(state) {
        state.mobileMenuOpened = !state.mobileMenuOpened
      },
    },
    actions: {
      async nuxtServerInit(vueContext) {
        // Download first 4 people
        let randomUsers = []
        // for (let i = 0; i < 5; i++) {
        //   let user = await this.$axios.$get(
        //     'https://randomuser.me/api/?nat=us,dk,fr,gb'
        //   )
        //   randomUsers.push(user.results[0])
        // }

        for (let i = 0; i < 9; i++) {
          let nft = {}
          nft.id = uid()
          nft.name = lorem.generateWords(4)
          nft.price = 3 + Math.random() * 10

          //Сгенерируем несколько точек/ставок, по убывающей от цены
          nft.bidsHistory = []
          nft.bidsHistory.push(+nft.price.toFixed(2))
          //Генерируем рандомное количество итераций
          let bidsQty = Math.floor(1 + Math.random() * 8)
          for (let i = 0; i < bidsQty; i++) {
            if (i == 1) {
              let newBid = nft.price - 2 + Math.random() * 1
              nft.bidsHistory.push(+newBid.toFixed(2))
            } else {
              let lastBid = nft.bidsHistory[nft.bidsHistory.length - 1]
              let newBid = lastBid - Math.random()
              nft.bidsHistory.push(+newBid.toFixed(2))
            }
          }

          nft.bidsHistory.reverse()

          nft.favorite = false
          nft.timeTillTheEnd = null
          nft.countingInAction = false

          let collections = [
            'photography',
            'games',
            'music',
            'architecture',
            'abstract',
          ]
          nft.collection =
            collections[Math.floor(Math.random() * collections.length)]

          // nft.image = `https://source.unsplash.com/collection/50332754/600x600/?sig=${Math.floor(
          //   1 + Math.random() * 275
          // )}`

          // nft.author = {}
          // let author = await this.$axios.$get(
          //   'https://randomuser.me/api/?nat=us,dk,fr,gb'
          // )
          // nft.author.name =
          // author.results[0].name.first + ' ' + author.results[0].name.last

          // nft.author.picture = author.results[0].picture.medium

          nft.users = []
          for (let i = 1; i < 5; i++) {
            let user = {}
            // user.picture =
            //   randomUsers[Math.floor(Math.random() * 5)].picture.thumbnail
            // nft.users.push(user)
            user.picture = '@/assets/img/man_1.png'
          }

          nft.biddingUsers = Math.floor(12 + Math.random() * (150 + 1 - 12))
          nft.likedUsers = Math.floor(64 + Math.random() * (600 + 1 - 64))

          nft.expireTimestamp =
            // Date.now() + 60000 * Math.floor(2 + Math.random() * 2)
            80000 * Math.floor(1 + Math.random() * 8)
          // 60000

          vueContext.state.nftItems.push(nft)
        }
      },
      async updateItem(vueContext, nft) {
        // vueContext.state.nftItems.findIndex((item) => {
        //   return item.id == nft.id
        // })

        // let index = vueContext.state.nftItems.findIndex((item) => {
        //   return item.id == nft.id
        // })

        let updatingNft = vueContext.state.nftItems.find((item) => {
          return item.id == nft.id
        })

        // updatingNft.id = uid()
        updatingNft.name = lorem.generateWords(4)

        updatingNft.price = 1 + Math.random() * 6

        updatingNft.favorite = false

        let collections = [
          'photography',
          'games',
          'music',
          'architecture',
          'abstract',
        ]
        updatingNft.collection =
          collections[Math.floor(Math.random() * collections.length)]

        // updatingNft.image = `https://source.unsplash.com/collection/50332754/600x600/?sig=${Math.floor(
        //   1 + Math.random() * 275
        // )}`

        // let author = await this.$axios.$get(
        //   'https://randomuser.me/api/?nat=us,dk,fr,gb'
        // )
        // vueContext.state.nftItems[index].author.name =
        //   author.results[0].name.first + ' ' + author.results[0].name.last

        // vueContext.state.nftItems[index].author.picture =
        //   author.results[0].picture.medium

        updatingNft.users = []
        for (let i = 1; i < 5; i++) {
          let user = {}
          // let data = await this.$axios.$get(
          //   'https://randomuser.me/api/?nat=us,dk,fr,gb'
          // )
          // user.picture = data.results[0].picture.thumbnail
          user.picture = '@/assets/img/man_1.png'
          updatingNft.users.push(user)
        }

        updatingNft.biddingUsers = Math.floor(
          12 + Math.random() * (150 + 1 - 12)
        )
        updatingNft.likedUsers = Math.floor(64 + Math.random() * (600 + 1 - 64))

        updatingNft.expireTimestamp =
          // Date.now() + 60000 * Math.floor(2 + Math.random() * 2)
          80000 * Math.floor(1 + Math.random() * 8)
        // 60000
        updatingNft.timeTillTheEnd = updatingNft.expireTimestamp

        updatingNft.collection =
          collections[Math.floor(Math.random() * collections.length)]

        updatingNft.expireTimestamp = 10000 * Math.floor(1 + Math.random() * 60)
      },
    },
    getters: {
      nftItems(state) {
        return state.nftItems
      },
      sortedByPrice(state) {
        let sortedArray = [...state.nftItems].sort(function (a, b) {
          return a.price - b.price
        })
        // return sortedArray.slice(0, 4)
        return sortedArray
      },
      nftById(state, id) {
        state.nftItems.find((item) => {
          return item.id == id
        })
      },

      alredyOffered: (state) => (id) => {
        // console.log(id)
        // console.log(state.userBids)
        // console.log(state.userBids.find((item) => item == id))
        return state.userBids.includes(id)
      },
      timerIsActive: (state) => (id) => {
        return state.itemsWithActiveTimer.includes(id)
      },
    },
  })
}

export default store
