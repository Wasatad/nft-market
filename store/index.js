import Vuex from 'vuex'
import { uid } from 'uid'
import { LoremIpsum } from 'lorem-ipsum'
import nodeFetch from 'node-fetch'
import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: 'SSG3BGr1mW1zvyh-mOcQLaf1RZhlz8vwyuZw4lRsTxA',
  fetch: nodeFetch,
})

const lorem = new LoremIpsum()

const store = () => {
  return new Vuex.Store({
    state: {
      latestNFTs: [],
      popularNFTs: [],
      otherNFTs: [],
      currentNFT: {},
      userBids: [],
      photos: [],

      mobileMenuOpened: false,
      isCongratsAlertVisible: false,
    },
    mutations: {
      openCongratsAlert(state) {
        state.isCongratsAlertVisible = true
      },
      closeCongratsAlert(state) {
        state.isCongratsAlertVisible = false
      },
      toggleFav(state, id) {
        //Check every array for this item
        if (
          state.latestNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.latestNFTs.find((item) => {
            return item.id == id
          })
          item.favorite = !item.favorite
        }

        if (
          state.popularNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.popularNFTs.find((item) => {
            return item.id == id
          })
          item.favorite = !item.favorite
        }

        if (
          state.otherNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.otherNFTs.find((item) => {
            return item.id == id
          })
          item.favorite = !item.favorite
        }

        if (state.currentNFT) {
          state.currentNFT.favorite = !state.currentNFT.favorite
        }
      },

      //Timer for all NFT`s on main
      timer(state, { id, category }) {
        let targetArray = null

        if (category == 'popularNFTs') {
          targetArray = state.popularNFTs
        } else if (category == 'latestNFTs') {
          targetArray = state.latestNFTs
        } else if (category == 'otherNFTs') {
          targetArray = state.otherNFTs
        }
        let item = targetArray.find((item) => {
          return item.id == id
        })
        if (item) {
          item.timeTillTheEnd -= 1000
        }
      },

      //Timer for current NFT
      currentTimer(state) {
        state.currentNFT.timeTillTheEnd -= 1000
        this.$cookies.set('currentNFT', JSON.stringify(state.currentNFT))
      },

      setNewPrice(state, { price, id }) {
        state.currentNFT.price = price
        state.currentNFT.bidsHistory.push(price)
        state.userBids.push(state.currentNFT.id)
        this.$cookies.set('userBids', JSON.stringify(state.userBids))

        //Check each array. If it includes this NFT - update it price

        if (
          state.latestNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.latestNFTs.find((item) => {
            return item.id == id
          })
          item.price = price
        }

        if (
          state.popularNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.popularNFTs.find((item) => {
            return item.id == id
          })
          item.price = price
        }

        if (
          state.otherNFTs.findIndex((item) => {
            return item.id == id
          }) != -1
        ) {
          let item = state.otherNFTs.find((item) => {
            return item.id == id
          })
          item.price = price
        }
      },

      activateCounting(state, { id, category }) {
        let targetArray = null

        if (category == 'popularNFTs') {
          targetArray = state.popularNFTs
        } else if (category == 'latestNFTs') {
          targetArray = state.latestNFTs
        } else if (category == 'otherNFTs') {
          targetArray = state.otherNFTs
        }
        let item = targetArray.find((item) => {
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
      clearNFTs(context, collection) {
        if (collection == 'otherNFTs') {
          context.state.otherNFTs = []
        } else if (collection == 'popularNFTs') {
          context.state.popularNFTs = []
        } else if (collection == 'latestNFTs') {
          context.state.latestNFTs = []
        }
      },
      async loadNFTs(context, payload) {
        let targetArray = null
        if (payload.category == 'latestNFTs') {
          targetArray = context.state.latestNFTs
        } else if (payload.category == 'popularNFTs') {
          targetArray = context.state.popularNFTs
        } else if (payload.category == 'otherNFTs') {
          targetArray = context.state.otherNFTs
        }

        //Random German - API
        let randomUsers = []

        try {
          let response = await this.$axios.$get(
            'https://randomname.de/?format=json&count=10&images=1'
          )

          randomUsers = response
        } catch (err) {
          console.log(err)
        }

        for (let i = 0; i < payload.qty; i++) {
          let nft = {}
          nft.id = uid()
          nft.name = lorem.generateWords(4)
          nft.price = 3 + Math.random() * 10

          nft.bidsHistory = []
          nft.bidsHistory.push(+nft.price.toFixed(2))

          //Generate random number for iterations
          let bidsQty = Math.floor(1 + Math.random() * 6)

          //Generate random prices from max to min
          for (let i = 0; i < bidsQty; i++) {
            if (i == 1) {
              let newBid = nft.price - 2 + Math.random()
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
            'Photography',
            'Games',
            'Music',
            'Architecture',
            'Abstract',
          ]
          nft.collection = { name: '', picture: '' }

          nft.collection.name =
            collections[Math.floor(Math.random() * collections.length)]
          nft.collection.picture = ''
          if (nft.collection.name == 'Photography') {
            nft.collection.picture = 'photography-collection.png'
          } else if (nft.collection.name == 'Games') {
            nft.collection.picture = 'games-collection.png'
          } else if (nft.collection.name == 'Music') {
            nft.collection.picture = 'music-collection.png'
          } else if (nft.collection.name == 'Architecture') {
            nft.collection.picture = 'architecture-collection.png'
          } else if (nft.collection.name == 'Abstract') {
            nft.collection.picture = 'abstract-collection.png'
          }

          nft.image =
            context.state.photos[Math.floor(Math.random() * 30)].urls.regular

          nft.author = { name: '', picture: '' }

          if (!payload.author) {
            let author = randomUsers[Math.floor(Math.random() * 10)]

            nft.author.name = author.username
            nft.author.picture = author.image
          } else {
            nft.author.name = payload.author.name
            nft.author.picture = payload.author.picture
          }

          nft.users = []

          let avatarsQty = bidsQty
          if (avatarsQty > 4) {
            avatarsQty = 4
          }

          for (let i = 0; i <= avatarsQty; i++) {
            let user = {}

            //Random German - API
            user.picture = randomUsers[Math.floor(Math.random() * 10)].image

            nft.users.push(user)
          }

          nft.expireTimestamp = 90000 * Math.floor(1 + Math.random() * 9)
          targetArray.push(nft)
        }
      },
      async updateNFT(context, payload) {
        let targetArray = null

        if (payload.category == 'popularNFTs') {
          targetArray = context.state.popularNFTs
        } else if (payload.category == 'latestNFTs') {
          targetArray = context.state.latestNFTs
        } else if (payload.category == 'otherNFTs') {
          targetArray = context.state.otherNFTs
        }

        let updatingNft = targetArray.find((item) => {
          return item.id == payload.id
        })

        updatingNft.id = uid()
        updatingNft.name = lorem.generateWords(4)

        updatingNft.price = 3 + Math.random() * 10

        updatingNft.bidsHistory = []
        updatingNft.bidsHistory.push(+updatingNft.price.toFixed(2))

        let bidsQty = Math.floor(1 + Math.random() * 8)
        for (let i = 0; i < bidsQty; i++) {
          if (i == 1) {
            let newBid = updatingNft.price - 2 + Math.random() * 1
            updatingNft.bidsHistory.push(+newBid.toFixed(2))
          } else {
            let lastBid =
              updatingNft.bidsHistory[updatingNft.bidsHistory.length - 1]
            let newBid = lastBid - Math.random()
            updatingNft.bidsHistory.push(+newBid.toFixed(2))
          }
        }

        updatingNft.bidsHistory.reverse()

        updatingNft.favorite = false

        let collections = [
          'Photography',
          'Games',
          'Music',
          'Architecture',
          'Abstract',
        ]
        updatingNft.collection = { name: '', picture: '' }

        updatingNft.collection.name =
          collections[Math.floor(Math.random() * collections.length)]

        updatingNft.collection.picture = ''
        if (updatingNft.collection.name == 'Photography') {
          updatingNft.collection.picture = 'photography-collection.png'
        } else if (updatingNft.collection.name == 'Games') {
          updatingNft.collection.picture = 'games-collection.png'
        } else if (updatingNft.collection.name == 'Music') {
          updatingNft.collection.picture = 'music-collection.png'
        } else if (updatingNft.collection.name == 'Architecture') {
          updatingNft.collection.picture = 'architecture-collection.png'
        } else if (updatingNft.collection.name == 'Abstract') {
          updatingNft.collection.picture = 'abstract-collection.png'
        }

        updatingNft.image = ''
        try {
          let result = await unsplash.photos.getRandom({
            collectionIds: ['50332754'],
            count: 1,
          })
          updatingNft.image = result.response[0].urls.regular
        } catch (err) {
          console.log(err)
        }

        let randomUsers = []

        try {
          let response = await this.$axios.$get(
            'https://randomname.de/?format=json&count=10&images=1'
          )
          randomUsers = response
        } catch (err) {
          console.log(err)
        }

        updatingNft.author = { name: '', picture: '' }

        let author = randomUsers[Math.floor(Math.random() * 10)]
        updatingNft.author.name = author.username
        updatingNft.author.picture = author.image

        updatingNft.users = []

        let avatarsQty = bidsQty
        if (avatarsQty > 4) {
          avatarsQty = 4
        }

        for (let i = 0; i <= avatarsQty; i++) {
          let user = {}

          user.picture = randomUsers[Math.floor(Math.random() * 10)].image

          updatingNft.users.push(user)
        }

        updatingNft.expireTimestamp = 90000 * Math.floor(1 + Math.random() * 9)
        updatingNft.timeTillTheEnd = updatingNft.expireTimestamp
      },

      async setCurrentItem(context, item) {
        context.state.currentNFT = { ...item }

        this.$cookies.set(
          'currentNFT',
          JSON.stringify(context.state.currentNFT)
        )

        this.$router.push('/details')
      },

      async nuxtServerInit({ dispatch, state }) {
        let currentNFT = this.$cookies.get('currentNFT')
        let userBids = this.$cookies.get('userBids')

        if (currentNFT) {
          state.currentNFT = currentNFT
        }

        if (userBids) {
          state.userBids = userBids
        }

        //Load photos from unsplah
        try {
          let result = await unsplash.photos.getRandom({
            collectionIds: ['50332754'],
            count: 30,
          })
          state.photos = result.response
        } catch (err) {
          console.log(err)
        }

        if (state.latestNFTs.length < 1) {
          await dispatch('loadNFTs', {
            category: 'latestNFTs',
            qty: 9,
          })
        }
        if (state.popularNFTs.length < 1) {
          await dispatch('loadNFTs', {
            category: 'popularNFTs',
            qty: 5,
          })
        }
      },
    },
    getters: {
      latestNFTs(state) {
        return state.latestNFTs
      },
      sortedByPrice(state) {
        let sortedArray = [...state.latestNFTs].sort(function (a, b) {
          return a.price - b.price
        })
        return sortedArray
      },
      nftById(state, id) {
        state.latestNFTs.find((item) => {
          return item.id == id
        })
      },

      alredyOffered: (state) => (id) => {
        return state.userBids.includes(id)
      },
    },
  })
}

export default store
