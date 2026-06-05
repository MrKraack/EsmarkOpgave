<template>
  <div class="mx-auto min-h-screen w-[min(100%,430px)] bg-surface pb-[72px] font-sans text-ink shadow-shell antialiased sm:w-full sm:bg-white sm:pb-0 sm:shadow-none md:flex md:flex-col md:border-t-[5px] md:border-[#202024]">
    <header
      class="sticky top-0 z-30 mx-auto grid h-16 w-full grid-cols-[56px_1fr_56px] items-center border-b border-line bg-panel px-3 text-brand-blue md:static md:h-[82px] md:w-[min(100%,720px)] md:grid-cols-[56px_1fr_56px] md:px-2 lg:w-[min(100%_-_48px,1328px)] lg:grid-cols-[170px_minmax(0,1fr)] lg:border-b-0 lg:p-0 xl:w-[min(100%_-_80px,1520px)] 2xl:w-[min(100%_-_120px,1680px)]"
      aria-label="Hovednavigation"
    >
      <button class="inline-grid h-12 w-12 place-items-center border-0 bg-transparent text-brand-blue lg:hidden" aria-label="Åbn menu">
        <Menu :size="22" stroke-width="2.5" />
      </button>
      <a class="inline-flex min-w-0 items-center justify-center lg:justify-start" href="#home" aria-label="Esmark">
        <img class="block h-auto w-[70px] md:w-[82px]" src="https://esmark.de/_nuxt/esmark_logo_de.CE5t-e-d.svg" alt="Esmark" />
      </a>
      <nav class="hidden h-full min-w-0 items-center justify-between gap-4 lg:flex xl:gap-5 2xl:gap-7" aria-label="Primær navigation">
        <a class="whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-brand-blue no-underline xl:text-[15px] 2xl:text-base" href="#search">Søg feriehus</a>
        <a class="whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:text-[15px] 2xl:text-base" href="#denmark">Danmark</a>
        <a class="whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:text-[15px] 2xl:text-base" href="#dogs">Feriehuse med hund</a>
        <a class="whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:text-[15px] 2xl:text-base" href="#info">Info</a>
        <a class="whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:text-[15px] 2xl:text-base" href="#activities">Aktiviteter</a>
        <a class="hidden whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:inline xl:text-[15px] 2xl:text-base" href="#last-minute">Last Minute</a>
        <a class="hidden whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:inline xl:text-[15px] 2xl:text-base" href="#blog">Blog</a>
        <a class="hidden whitespace-nowrap text-sm font-extrabold uppercase tracking-normal text-[#006eb8] no-underline xl:inline xl:text-[15px] 2xl:text-base" href="#about">Om os</a>
      </nav>
      <button class="inline-grid h-12 w-12 place-items-center border-0 bg-transparent text-brand-blue lg:hidden" aria-label="Søg">
        <Search :size="21" stroke-width="2.5" />
      </button>
    </header>

    <main class="m-0 w-full px-3.5 pb-4 pt-3.5 md:relative md:flex-1 md:overflow-x-hidden md:border-t md:border-[#d4dce3] md:p-0">
      <h1 class="sr-only">Søg feriehuse i Danmark</h1>

      <section class="mb-3 flex items-center justify-between gap-3 md:hidden">
        <p class="m-0 text-[15px] leading-[1.45]">
          Vi har fundet
          <strong class="text-brand-blue">{{ resultCount }} feriehuse</strong>
          til dig
        </p>
        <div class="flex flex-none gap-1.5" aria-label="Visning">
          <button class="inline-grid h-[26px] w-[26px] place-items-center rounded-[5px] border-0 bg-[#e6f3fb] text-brand-blue" aria-label="Listevisning">
            <List :size="18" />
          </button>
          <button class="inline-grid h-[26px] w-[26px] place-items-center rounded-[5px] border-0 bg-transparent text-[#7d8b96]" aria-label="Kortvisning">
            <Grid2X2 :size="18" />
          </button>
          <button class="inline-grid h-[26px] w-[26px] place-items-center rounded-[5px] border-0 bg-transparent text-[#7d8b96]" aria-label="Kort">
            <MapPin :size="18" />
          </button>
        </div>
      </section>

      <section class="mb-3.5 grid gap-2 md:hidden" aria-label="Filtrer feriehuse">
        <label class="grid min-w-0 gap-1">
          <span class="text-[10px] font-semibold uppercase leading-none text-[#536676]">Sortér efter</span>
          <select class="h-[42px] w-full rounded-md border border-[#b9c7d0] bg-panel py-0 pl-3 pr-[34px] text-[13px] text-ink" v-model="sortBy">
            <option value="recommended">Anbefalet</option>
            <option value="priceAsc">Laveste pris</option>
            <option value="priceDesc">Højeste pris</option>
            <option value="beachAsc">Kortest til stranden</option>
            <option value="ratingDesc">Bedste bedømmelser</option>
          </select>
        </label>

        <div class="grid grid-cols-[1fr_88px] gap-2">
          <label class="grid min-w-0 gap-1">
            <span class="text-[10px] font-semibold uppercase leading-none text-[#536676]">Område</span>
            <select class="h-11 w-full rounded-md border border-[#b9c7d0] bg-panel py-0 pl-3 pr-[34px] text-[13px] text-ink" v-model="selectedCity">
              <option value="all">Alle</option>
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </label>

          <label class="grid min-w-0 gap-1">
            <span class="text-[10px] font-semibold uppercase leading-none text-[#536676]">Personer</span>
            <select class="h-11 w-full rounded-md border border-[#b9c7d0] bg-panel py-0 pl-3 pr-[34px] text-[13px] text-ink" v-model.number="minPersons">
              <option :value="0">Alle</option>
              <option :value="4">4+</option>
              <option :value="6">6+</option>
              <option :value="8">8+</option>
              <option :value="10">10+</option>
            </select>
          </label>

          <label class="col-span-full flex min-h-[38px] items-center rounded-md border border-[#c7d3dc] bg-panel px-2.5 py-2">
            <input class="mr-2 h-[18px] w-[18px] accent-brand-blue" v-model="dogsOnly" type="checkbox" />
            <span class="text-xs text-ink">Hunde tilladt</span>
          </label>
        </div>
      </section>

      <div class="relative z-[1] grid md:mx-auto md:w-full md:grid-cols-1 md:px-[22px] md:pb-14 lg:w-[min(100%_-_48px,1320px)] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6 lg:px-0 lg:pb-16 xl:w-[min(100%_-_80px,1520px)] xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-8 2xl:w-[min(100%_-_80px,1760px)] 2xl:grid-cols-[360px_minmax(0,1fr)] 2xl:gap-10">
        <aside class="hidden self-start rounded-r bg-[#2286c5] p-6 text-white lg:sticky lg:top-6 lg:mt-10 lg:block" aria-label="Søgning efter feriehus" @keydown.escape="activeSidebarMenu = ''">
          <div class="mb-[18px] flex items-start justify-between gap-[18px]">
            <h2 class="m-0 text-[22px] leading-tight text-white">Find feriehus i Danmark</h2>
            <button class="relative inline-grid h-9 w-9 place-items-center border-0 bg-transparent text-white" aria-label="Filter">
              <SlidersHorizontal :size="27" />
              <span class="absolute -top-[3px] right-0 text-xs font-bold">1</span>
            </button>
          </div>

          <span class="mb-4 inline-flex min-h-7 items-center gap-2 rounded-md bg-[#eaf3fa] px-3 py-1 text-sm text-[#283541]">
            {{ cityLabel }}
            <button v-if="selectedCity !== 'all'" class="border-0 bg-transparent text-lg leading-none text-[#6a747e]" aria-label="Fjern område" @click="selectCity('all')">x</button>
          </span>

          <button class="mb-3.5 flex min-h-11 w-full cursor-not-allowed items-center gap-3.5 rounded border border-[#d3dbe1] bg-[#e8edf1] px-3.5 py-0 text-left text-[15px] text-[#7a8791]" type="button" disabled aria-disabled="true">
            <CalendarDays class="text-[#9aa6ae]" :size="20" />
            <span>Ankomst</span>
          </button>
          <div class="relative mb-3.5 min-w-0">
            <button
              class="flex min-h-11 w-full items-center gap-3.5 rounded border bg-white px-3.5 py-0 text-left text-[15px] text-[#22313f]"
              :class="activeSidebarMenu === 'city' ? 'border-[#7b6b62] shadow-[inset_0_0_0_1px_#7b6b62]' : 'border-[#d3dbe1]'"
              :aria-expanded="activeSidebarMenu === 'city'"
              aria-haspopup="listbox"
              @click="toggleSidebarMenu('city')"
            >
              <MapPin class="text-[#8c98a3]" :size="21" />
              <span>{{ cityLabel }}</span>
            </button>
            <div
              v-if="activeSidebarMenu === 'city'"
              class="absolute left-0 top-[calc(100%+3px)] z-40 w-full overflow-hidden rounded-b-md border border-[#b9b9b9] bg-white shadow-[0_8px_22px_rgba(34,49,63,0.2)]"
              role="listbox"
              aria-label="Vælg område"
            >
              <button
                v-for="city in cityOptions"
                :key="city.value"
                class="flex min-h-[43px] w-full items-center border-0 px-2.5 py-0 text-left text-sm text-[#333333] hover:bg-[#dcdcdc]"
                :class="city.value === selectedCity ? 'bg-[#dcdcdc]' : 'bg-white'"
                role="option"
                :aria-selected="city.value === selectedCity"
                @click="selectCity(city.value)"
              >
                {{ city.label }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3.5">
            <div class="relative min-w-0">
              <button
                class="flex min-h-11 w-full items-center gap-3.5 rounded border bg-white px-3.5 py-0 text-left text-[15px] text-[#22313f]"
                :class="activeSidebarMenu === 'persons' ? 'border-[#7b6b62] shadow-[inset_0_0_0_1px_#7b6b62]' : 'border-[#d3dbe1]'"
                :aria-expanded="activeSidebarMenu === 'persons'"
                aria-haspopup="listbox"
                @click="toggleSidebarMenu('persons')"
              >
                <UsersRound class="text-[#8c98a3]" :size="21" />
                <span>{{ personsLabel }}</span>
              </button>
              <div
                v-if="activeSidebarMenu === 'persons'"
                class="absolute left-0 top-[calc(100%+3px)] z-40 w-[198px] overflow-hidden rounded-b-md border border-[#b9b9b9] bg-white shadow-[0_8px_22px_rgba(34,49,63,0.2)]"
                role="listbox"
                aria-label="Vælg antal personer"
              >
                <button
                  v-for="option in personOptions"
                  :key="option.label"
                  class="flex min-h-[43px] w-full items-center border-0 px-2.5 py-0 text-left text-sm text-[#333333] hover:bg-[#dcdcdc]"
                  :class="option.value === minPersons ? 'bg-[#dcdcdc]' : 'bg-white'"
                  role="option"
                  :aria-selected="option.value === minPersons"
                  @click="selectPersons(option)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <div class="relative min-w-0">
              <button
                class="flex min-h-11 w-full items-center gap-3.5 rounded border bg-white px-3.5 py-0 text-left text-[15px] text-[#22313f]"
                :class="activeSidebarMenu === 'dogs' ? 'border-[#7b6b62] shadow-[inset_0_0_0_1px_#7b6b62]' : 'border-[#d3dbe1]'"
                :aria-expanded="activeSidebarMenu === 'dogs'"
                aria-haspopup="listbox"
                @click="toggleSidebarMenu('dogs')"
              >
                <PawPrint class="text-[#8c98a3]" :size="21" />
                <span>{{ dogsLabel }}</span>
              </button>
              <div
                v-if="activeSidebarMenu === 'dogs'"
                class="absolute left-0 top-[calc(100%+3px)] z-40 w-full overflow-hidden rounded-b-md border border-[#b9b9b9] bg-white shadow-[0_8px_22px_rgba(34,49,63,0.2)]"
                role="listbox"
                aria-label="Vælg hund"
              >
                <button
                  v-for="option in dogOptions"
                  :key="option.label"
                  class="flex min-h-[43px] w-full items-center border-0 px-2.5 py-0 text-left text-sm text-[#333333] hover:bg-[#dcdcdc]"
                  :class="option.value === selectedDogOption ? 'bg-[#dcdcdc]' : 'bg-white'"
                  role="option"
                  :aria-selected="option.value === selectedDogOption"
                  @click="selectDogs(option)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="my-3.5 flex justify-between gap-[18px]">
            <button class="inline-flex items-center gap-1.5 border-0 bg-transparent text-sm font-semibold text-white" type="button">
              <SlidersHorizontal :size="19" />
              Ønsker til huset
            </button>
            <button class="inline-flex items-center gap-1.5 border-0 bg-transparent text-sm font-semibold text-white" type="button" @click="resetFilters">
              <RotateCcw :size="19" />
              Nulstil
            </button>
          </div>

          <label class="mb-3.5 block min-w-0">
            <span class="sr-only">Fritekstsøgning</span>
            <input
              v-model.trim="freeTextQuery"
              class="block min-h-11 w-full rounded border border-[#d3dbe1] bg-white px-3.5 py-0 text-[15px] text-[#22313f] placeholder:text-[#22313f] focus:border-[#7b6b62] focus:outline-none focus:ring-1 focus:ring-[#7b6b62]"
              type="search"
              placeholder="Fritekstsøgning (valgfri)"
              autocomplete="off"
            />
          </label>
          <button class="block min-h-[49px] w-full rounded-[5px] border-0 bg-brand-lime text-[21px] font-extrabold text-[#33384e]">{{ resultCount }} feriehuse</button>
        </aside>

        <section class="min-w-0">
          <p class="mx-0 mb-20 mt-1 hidden max-w-[72ch] text-[17px] leading-[1.65] text-[#3d3d3d] lg:block 2xl:max-w-[900px]">
            Et særligt højdepunkt: Horns Rev strækker sig langt ud i havet og danner næsten en lagune på sydsiden.
          </p>
          <h2 class="mb-[82px] mt-0 hidden text-[31px] font-normal leading-tight text-[#0071bd] lg:block">Book sommerferien i Danmark nu!</h2>

          <section class="card-grid grid gap-4 md:w-full md:gap-6" aria-label="Feriehuse">
            <ListingCard
              v-for="listing in sortedListings"
              :key="listing.id"
              :listing="listing"
            />
          </section>

          <p v-if="sortedListings.length === 0" class="my-6 text-center text-sm text-muted">
            Ingen feriehuse matcher filtrene.
          </p>
        </section>
      </div>
    </main>

    <nav class="fixed inset-x-0 bottom-0 z-20 mx-auto grid h-[58px] w-[min(100%,430px)] grid-cols-4 border-t border-line bg-panel sm:hidden" aria-label="Bundnavigation">
      <a class="grid content-center place-items-center gap-[3px] text-[10px] font-medium text-brand-orange no-underline" href="#search">
        <Search :size="18" />
        <span>Søg</span>
      </a>
      <a class="grid content-center place-items-center gap-[3px] text-[10px] font-medium text-[#14344a] no-underline" href="#favorites">
        <Heart :size="18" />
        <span>Favoritter</span>
      </a>
      <a class="grid content-center place-items-center gap-[3px] text-[10px] font-medium text-[#14344a] no-underline" href="#bookings">
        <CalendarDays :size="18" />
        <span>Bookinger</span>
      </a>
      <a class="grid content-center place-items-center gap-[3px] text-[10px] font-medium text-[#14344a] no-underline" href="#profile">
        <UserRound :size="18" />
        <span>Profil</span>
      </a>
    </nav>
  </div>
</template>

<script>
import {
  CalendarDays,
  Grid2X2,
  Heart,
  List,
  MapPin,
  Menu,
  PawPrint,
  RotateCcw,
  Search,
  SlidersHorizontal,
  UsersRound,
  UserRound
} from '@lucide/vue'
import ListingCard from './components/ListingCard.vue'
import data from '../sommerhuse.json'

export default {
  name: 'App',
  components: {
    CalendarDays,
    Grid2X2,
    Heart,
    List,
    ListingCard,
    MapPin,
    Menu,
    PawPrint,
    RotateCcw,
    Search,
    SlidersHorizontal,
    UsersRound,
    UserRound
  },
  data() {
    return {
      sortBy: 'recommended',
      selectedCity: 'all',
      minPersons: 0,
      dogsOnly: false,
      activeSidebarMenu: '',
      selectedDogOption: 'any',
      freeTextQuery: '',
      listings: data.hits
    }
  },
  computed: {
    resultCount() {
      return this.hasActiveFilters ? this.filteredListings.length : 593
    },
    hasActiveFilters() {
      return (
        this.selectedCity !== 'all' ||
        this.minPersons > 0 ||
        this.dogsOnly ||
        this.selectedDogOption !== 'any' ||
        this.freeTextQuery.length > 0
      )
    },
    cities() {
      return [...new Set(this.listings.map((listing) => listing.city))].sort()
    },
    cityOptions() {
      return [
        { label: 'Alle områder', value: 'all' },
        ...this.cities.map((city) => ({ label: city, value: city }))
      ]
    },
    cityLabel() {
      return this.selectedCity === 'all' ? 'Alle områder' : this.selectedCity
    },
    personOptions() {
      return [
        { label: 'Personer', value: 0 },
        { label: '2 personer', value: 2 },
        { label: '3 personer', value: 3 },
        { label: '4 personer', value: 4 },
        { label: '5 personer', value: 5 },
        { label: '6 personer', value: 6 },
        { label: '7 personer', value: 7 },
        { label: '8 personer', value: 8 },
        { label: '9 personer', value: 9 },
        { label: '10 personer', value: 10 },
        { label: '12 personer', value: 12 },
        { label: '14 personer', value: 14 },
        { label: '16 personer', value: 16 },
        { label: '18 personer', value: 18 },
        { label: '20 personer', value: 20 }
      ]
    },
    dogOptions() {
      return [
        { label: 'Hund', value: 'any', dogsOnly: false },
        { label: 'Ikke vigtigt', value: 'not-important', dogsOnly: false },
        { label: '1 hund', value: '1', dogsOnly: true },
        { label: '2 hunde', value: '2', dogsOnly: true },
        { label: 'Mere end 2 hunde', value: 'more-than-2', dogsOnly: true },
        { label: 'Hund ikke tilladt', value: 'none', dogsOnly: false }
      ]
    },
    personsLabel() {
      return this.personOptions.find((option) => option.value === this.minPersons)?.label || 'Personer'
    },
    dogsLabel() {
      return this.dogOptions.find((option) => option.value === this.selectedDogOption)?.label || 'Hund'
    },
    filteredListings() {
      return this.listings.filter((listing) => {
        const facilities = listing.facilities || {}
        const matchesCity = this.selectedCity === 'all' || listing.city === this.selectedCity
        const matchesPersons = !this.minPersons || facilities.NumberOfPersons >= this.minPersons
        const matchesDogs = this.matchesDogFilter(facilities)
        const matchesSearch = this.matchesFreeTextSearch(listing)

        return matchesCity && matchesPersons && matchesDogs && matchesSearch
      })
    },
    sortedListings() {
      const sorters = {
        priceAsc: (a, b) => a.fromPrice - b.fromPrice,
        priceDesc: (a, b) => b.fromPrice - a.fromPrice,
        beachAsc: (a, b) => this.distanceToSea(a) - this.distanceToSea(b),
        ratingDesc: (a, b) => (b.userRating?.average || 0) - (a.userRating?.average || 0),
        recommended: (a, b) => {
          const weight = (value) =>
            Number.parseInt(String(value || '').replace(/\D/g, ''), 10) || 9
          return weight(a.sortWeight) - weight(b.sortWeight)
        }
      }

      return [...this.filteredListings].sort(sorters[this.sortBy])
    }
  },
  methods: {
    distanceToSea(listing) {
      return listing.facilities?.DistanceToSeaMeters || Number.MAX_SAFE_INTEGER
    },
    matchesDogFilter(facilities) {
      if (this.selectedDogOption === 'none') {
        return !facilities.PetsAllowed
      }

      if (this.selectedDogOption === '1') {
        return facilities.PetsAllowed && facilities.PetsMaxCount >= 1
      }

      if (this.selectedDogOption === '2') {
        return facilities.PetsAllowed && facilities.PetsMaxCount >= 2
      }

      if (this.selectedDogOption === 'more-than-2') {
        return facilities.PetsAllowed && facilities.PetsMaxCount > 2
      }

      return !this.dogsOnly || facilities.PetsAllowed
    },
    matchesFreeTextSearch(listing) {
      const query = this.freeTextQuery.toLocaleLowerCase('da-DK')

      if (!query) {
        return true
      }

      const facilities = listing.facilities || {}
      const haystack = [
        listing.name,
        listing.city,
        listing.address1,
        listing.address2,
        listing.title,
        listing.description,
        listing.postalCode,
        listing.lodgingId,
        facilities.NumberOfPersons,
        facilities.Bedrooms,
        facilities.DistanceToSeaMeters
      ]
        .filter((value) => value !== null && value !== undefined)
        .join(' ')
        .toLocaleLowerCase('da-DK')

      return haystack.includes(query)
    },
    toggleSidebarMenu(menu) {
      this.activeSidebarMenu = this.activeSidebarMenu === menu ? '' : menu
    },
    selectPersons(option) {
      this.minPersons = option.value
      this.activeSidebarMenu = ''
    },
    selectDogs(option) {
      this.selectedDogOption = option.value
      this.dogsOnly = option.dogsOnly
      this.activeSidebarMenu = ''
    },
    selectCity(city) {
      this.selectedCity = city
      this.activeSidebarMenu = ''
    },
    resetFilters() {
      this.selectedCity = 'all'
      this.minPersons = 0
      this.dogsOnly = false
      this.selectedDogOption = 'any'
      this.freeTextQuery = ''
      this.activeSidebarMenu = ''
    }
  }
}
</script>
