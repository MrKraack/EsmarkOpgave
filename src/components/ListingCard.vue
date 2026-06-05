<template>
  <article
    class="listing-card grid overflow-hidden rounded-lg bg-white shadow-card md:h-[800px] md:grid-rows-[300px_1fr_auto] lg:h-[760px] lg:grid-rows-[280px_1fr_auto] xl:h-[520px] xl:grid-cols-[minmax(420px,46%)_minmax(0,1fr)] xl:grid-rows-[1fr_104px] xl:border xl:border-[#d2dbe3] xl:shadow-[0_2px_8px_rgba(13,38,59,0.14)] 2xl:h-[430px] 2xl:grid-cols-[minmax(360px,40%)_minmax(0,1fr)_260px] 2xl:grid-rows-1"
    itemscope
    itemtype="https://schema.org/LodgingBusiness"
    :aria-labelledby="titleId"
  >
    <div class="relative aspect-[1.74/1] overflow-hidden bg-[#d7e5ec] md:h-[300px] md:aspect-auto lg:h-[280px] xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:h-full 2xl:row-span-1 2xl:rounded-l-lg">
      <img
        v-if="!imageFailed"
        class="block h-full w-full object-cover"
        :src="imageUrl"
        :alt="imageAlt"
        width="720"
        height="420"
        loading="lazy"
        itemprop="image"
        @error="imageFailed = true"
      />
      <div v-else class="grid h-full w-full place-items-center bg-[#e8f0f4] text-brand-blue" aria-hidden="true">
        <Home :size="40" />
      </div>

      <span v-if="isFresh" class="absolute left-3 top-3 rounded-sm bg-[#006cae] px-[9px] pb-1 pt-[5px] text-[9px] font-bold uppercase leading-none text-white md:left-6 md:top-6 md:rounded md:px-[15px] md:pb-[7px] md:pt-2 md:text-[13px]">Nyhed</span>

      <button
        class="absolute right-2.5 top-2.5 grid h-[38px] w-[38px] place-items-center rounded-full border-0 bg-white text-brand-blue shadow-[0_2px_5px_rgba(11,45,69,0.18)] md:right-6 md:top-6 md:h-[54px] md:w-[54px]"
        :class="isFavorite ? 'text-[#d8242f]' : 'text-brand-blue'"
        :aria-label="isFavorite ? 'Fjern fra favoritter' : 'Gem som favorit'"
        :aria-pressed="isFavorite"
        @click="toggleFavorite"
      >
        <Heart class="fill-white md:h-[27px] md:w-[27px]" :class="isFavorite ? 'fill-[#d8242f]' : 'fill-white'" :size="22" />
      </button>

      <button
        v-if="hasMultipleImages"
        class="absolute bottom-[74px] left-3 grid h-[30px] w-[30px] place-items-center rounded-full border border-[rgba(0,118,189,0.18)] bg-white/90 text-brand-blue shadow-[0_2px_8px_rgba(11,45,69,0.22)] md:left-6 md:top-1/2 md:h-[52px] md:w-[52px] md:-translate-y-1/2 md:bg-white/95"
        aria-label="Forrige billede"
        @click="previousImage"
      >
        <ChevronLeft class="md:h-11 md:w-11" :size="24" />
      </button>

      <button
        v-if="hasMultipleImages"
        class="absolute bottom-[74px] right-3 grid h-[30px] w-[30px] place-items-center rounded-full border border-[rgba(0,118,189,0.18)] bg-white/90 text-brand-blue shadow-[0_2px_8px_rgba(11,45,69,0.22)] md:right-6 md:top-1/2 md:h-[52px] md:w-[52px] md:-translate-y-1/2 md:bg-white/95"
        aria-label="Næste billede"
        @click="nextImage"
      >
        <ChevronRight class="md:h-11 md:w-11" :size="24" />
      </button>

      <div v-if="hasMultipleImages" class="absolute inset-x-0 bottom-[9px] flex justify-center gap-1 md:bottom-[22px] md:gap-1.5" aria-label="Billedvalg">
        <button
          v-for="(image, index) in carouselImages"
          :key="`${image.url}-${index}`"
          class="h-1.5 rounded-full border-0 bg-white/70 p-0 md:h-2.5 md:w-2.5"
          :class="index === activeImageIndex ? 'w-4 bg-white md:w-2.5' : 'w-1.5'"
          :aria-label="`Vis billede ${index + 1}`"
          :aria-current="index === activeImageIndex"
          @click="selectImage(index)"
        ></button>
      </div>
    </div>

    <div class="min-w-0 overflow-hidden px-3.5 pb-2.5 pt-[13px] md:px-6 md:py-5 xl:col-start-2 xl:row-start-1 xl:px-7 xl:py-6 2xl:px-[34px] 2xl:py-[25px]">
      <header class="mb-2.5 min-w-0 md:mb-3">
        <h3 :id="titleId" class="m-0 grid gap-0.5 text-[20px] leading-[1.1] text-ink md:text-[22px] 2xl:text-[23px]" itemprop="name">
          <span class="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-brand-blue" itemprop="addressLocality">{{ listing.city }}</span>
          <span class="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal text-ink" itemprop="streetAddress">{{ listing.address1 }}</span>
        </h3>
        <p class="mb-0 mt-1.5 text-[11px] font-semibold text-brand-blue-dark md:text-[13px]">ID: <span itemprop="identifier">{{ listing.name }}</span></p>
      </header>

      <div class="mb-3 flex min-h-4 gap-px text-brand-orange md:mb-4 2xl:absolute 2xl:m-[-1px] 2xl:h-px 2xl:w-px 2xl:overflow-hidden 2xl:whitespace-nowrap 2xl:[clip:rect(0,0,0,0)]" role="img" :aria-label="ratingLabel">
        <Star
          v-for="star in 5"
          :key="star"
          class="h-4 w-4 text-brand-orange"
          :class="{ 'fill-brand-orange': star <= roundedRating }"
          :size="16"
          stroke-width="2.4"
        />
      </div>

      <dl class="m-0 grid grid-cols-2 gap-2 md:gap-3 2xl:gap-2.5">
        <div class="grid min-h-[54px] min-w-0 grid-cols-[24px_minmax(0,1fr)] rounded-[5px] bg-[#f1f1f1] px-2.5 py-2 text-ink md:min-h-[64px] md:grid-cols-[34px_minmax(0,1fr)] md:rounded-lg md:bg-[#f3eeee] md:px-4 md:py-3">
          <UsersRound class="row-span-2 self-center text-brand-blue md:h-6 md:w-6" :size="18" />
          <dt class="min-w-0 self-end text-[9px] font-semibold uppercase leading-tight text-[#657888] md:text-[10px]">Personer</dt>
          <dd class="m-0 min-w-0 text-[11px] font-bold leading-tight [overflow-wrap:anywhere] md:text-lg" itemprop="maximumAttendeeCapacity">{{ persons }}</dd>
        </div>

        <div class="grid min-h-[54px] min-w-0 grid-cols-[24px_minmax(0,1fr)] rounded-[5px] bg-[#f1f1f1] px-2.5 py-2 text-ink md:min-h-[64px] md:grid-cols-[34px_minmax(0,1fr)] md:rounded-lg md:bg-[#f3eeee] md:px-4 md:py-3">
          <PawPrint class="row-span-2 self-center text-brand-blue md:h-6 md:w-6" :size="18" />
          <dt class="min-w-0 self-end text-[9px] font-semibold uppercase leading-tight text-[#657888] md:text-[10px]">Hunde</dt>
          <dd class="m-0 min-w-0 text-[11px] font-bold leading-tight [overflow-wrap:anywhere] md:text-lg" itemprop="petsAllowed">{{ dogText }}</dd>
        </div>

        <div class="grid min-h-[54px] min-w-0 grid-cols-[24px_minmax(0,1fr)] rounded-[5px] bg-[#f1f1f1] px-2.5 py-2 text-ink md:min-h-[64px] md:grid-cols-[34px_minmax(0,1fr)] md:rounded-lg md:bg-[#f3eeee] md:px-4 md:py-3">
          <Waves class="row-span-2 self-center text-brand-blue md:h-6 md:w-6" :size="18" />
          <dt class="min-w-0 self-end text-[9px] font-semibold uppercase leading-tight text-[#657888] md:text-[10px]">Strand</dt>
          <dd class="m-0 min-w-0 text-[11px] font-bold leading-tight [overflow-wrap:anywhere] md:text-lg">{{ beachDistance }}</dd>
        </div>

        <div class="grid min-h-[54px] min-w-0 grid-cols-[24px_minmax(0,1fr)] rounded-[5px] bg-[#f1f1f1] px-2.5 py-2 text-ink md:min-h-[64px] md:grid-cols-[34px_minmax(0,1fr)] md:rounded-lg md:bg-[#f3eeee] md:px-4 md:py-3">
          <BedDouble class="row-span-2 self-center text-brand-blue md:h-6 md:w-6" :size="18" />
          <dt class="min-w-0 self-end text-[9px] font-semibold uppercase leading-tight text-[#657888] md:text-[10px]">Soveværelser</dt>
          <dd class="m-0 min-w-0 text-[11px] font-bold leading-tight [overflow-wrap:anywhere] md:text-lg">{{ bedrooms }}</dd>
        </div>
      </dl>

      <ul class="mb-0 mt-[11px] flex list-none flex-wrap gap-[7px] p-0 md:mt-4 md:gap-3 2xl:mt-[18px] 2xl:gap-3.5">
        <li v-if="changeDay" class="inline-flex min-h-6 max-w-full items-center gap-1 rounded-full bg-[#dff1fb] px-2 py-1 text-[10px] font-semibold leading-none text-[#006cae] md:min-h-8 md:px-3 md:py-[7px] md:text-sm 2xl:min-h-9 2xl:px-4 2xl:py-2 2xl:text-base">
          <CalendarCheck class="shrink-0 md:h-[18px] md:w-[18px]" :size="13" />
          <span class="min-w-0 truncate">{{ changeDay }}</span>
        </li>
        <li v-if="hasFreeCleaning" class="inline-flex min-h-6 max-w-full items-center gap-1 rounded-full bg-[#ffe1cc] px-2 py-1 text-[10px] font-semibold leading-none text-[#9e4b00] md:min-h-8 md:px-3 md:py-[7px] md:text-sm 2xl:min-h-9 2xl:px-4 2xl:py-2 2xl:text-base">
          <Sparkles class="shrink-0 md:h-[18px] md:w-[18px]" :size="13" />
          <span class="min-w-0 truncate">Slutrengøring inkluderet</span>
        </li>
      </ul>
    </div>

    <footer class="flex min-h-[88px] items-center justify-between gap-3 bg-brand-blue px-3.5 py-3 text-white xl:col-start-2 xl:row-start-2 xl:min-h-0 xl:p-6 2xl:relative 2xl:col-start-3 2xl:row-start-1 2xl:flex-col 2xl:items-stretch 2xl:gap-[18px] 2xl:rounded-r-lg 2xl:p-0">
      <div class="hidden flex-row items-center justify-center gap-[3px] pt-7 text-brand-orange 2xl:flex 2xl:px-6" aria-hidden="true">
        <Star
          v-for="star in 5"
          :key="`price-${star}`"
          class="h-[30px] w-[30px] text-brand-orange"
          :class="{ 'fill-brand-orange': star <= roundedRating }"
          :size="14"
          stroke-width="2.4"
        />
      </div>

      <div class="grid min-w-0 content-center text-white 2xl:absolute 2xl:left-6 2xl:right-6 2xl:top-[calc(50%-18px)] 2xl:mx-0 2xl:h-auto 2xl:-translate-y-1/2 2xl:justify-items-center 2xl:border-y 2xl:border-white/20 2xl:bg-transparent 2xl:px-3 2xl:py-[18px] 2xl:text-center">
        <span class="text-[10px] font-extrabold uppercase leading-none md:text-sm md:normal-case md:text-white">fra</span>
        <strong class="mt-px text-[24px] font-extrabold leading-none md:text-[32px] 2xl:mt-1.5 2xl:text-[34px]">{{ formattedPrice }}</strong>
        <small class="mt-1 text-[9px] font-bold leading-[1.18] opacity-90 md:text-xs 2xl:mt-2 2xl:max-w-[170px] 2xl:text-[13px] 2xl:leading-[1.28]">Inkl. {{ formattedFee }} ekspeditionsgebyr</small>
      </div>

      <a class="inline-flex min-h-[42px] min-w-[120px] flex-none items-center justify-center gap-[7px] rounded-lg border-0 bg-brand-orange px-4 py-0 text-xs font-black text-white no-underline shadow-[0_2px_4px_rgba(11,45,69,0.2)] md:min-h-12 md:text-base xl:ml-auto xl:min-w-[190px] 2xl:m-0 2xl:mt-auto 2xl:min-h-[74px] 2xl:w-full 2xl:min-w-0 2xl:rounded-none 2xl:rounded-br-lg 2xl:px-6 2xl:text-xl 2xl:shadow-none" :href="listingUrl" :aria-label="`Se mere om ${title}`">
        Se mere
        <ChevronRight :size="18" stroke-width="3" />
      </a>
    </footer>
  </article>
</template>

<script>
import {
  BedDouble,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  PawPrint,
  Sparkles,
  Star,
  UsersRound,
  Waves
} from '@lucide/vue'

export default {
  name: 'ListingCard',
  components: {
    BedDouble,
    CalendarCheck,
    ChevronLeft,
    ChevronRight,
    Heart,
    Home,
    PawPrint,
    Sparkles,
    Star,
    UsersRound,
    Waves
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeImageIndex: 0,
      imageFailed: false,
      isFavorite: false
    }
  },
  computed: {
    facilities() {
      return this.listing.facilities || {}
    },
    carouselImages() {
      return this.listing.images?.length ? this.listing.images : []
    },
    currentImage() {
      return this.carouselImages[this.activeImageIndex]
    },
    hasMultipleImages() {
      return this.carouselImages.length > 1
    },
    title() {
      return `${this.listing.city} ${this.listing.address1}`
    },
    titleId() {
      return `listing-title-${this.listing.id}`
    },
    listingUrl() {
      return `#feriehus-${this.listing.name}`
    },
    imageUrl() {
      const image = this.currentImage?.url

      if (!image) {
        return ''
      }

      return `https://img.svc.esmark.dk${image}?format=jpg&fit=crop&w=720&h=420`
    },
    imageAlt() {
      return `Sommerhus på ${this.listing.address1}, ${this.listing.city}`
    },
    roundedRating() {
      return Math.round(this.listing.userRating?.average || this.facilities.StarRating || 0)
    },
    ratingLabel() {
      const average = this.listing.userRating?.average

      if (!average) {
        return `${this.facilities.StarRating || 0} stjerner`
      }

      return `${average.toFixed(1)} ud af 5 baseret på ${this.listing.userRating.count} anmeldelser`
    },
    persons() {
      return this.facilities.NumberOfPersons || this.facilities.SleepingSpaces || '-'
    },
    dogText() {
      if (!this.facilities.PetsAllowed) {
        return 'Nej'
      }

      return `Ja, maks. ${this.facilities.PetsMaxCount || 1}`
    },
    beachDistance() {
      const meters = this.facilities.DistanceToSeaMeters

      if (!meters) {
        return '-'
      }

      return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`
    },
    bedrooms() {
      return this.facilities.Bedrooms || '-'
    },
    changeDay() {
      const days = [
        ['ChangeDayMonday', 'Mandag'],
        ['ChangeDayTuesday', 'Tirsdag'],
        ['ChangeDayWednesday', 'Onsdag'],
        ['ChangeDayThursday', 'Torsdag'],
        ['ChangeDayFriday', 'Fredag'],
        ['ChangeDaySaturday', 'Lørdag'],
        ['ChangeDaySunday', 'Søndag']
      ]
      const match = days.find(([key]) => this.facilities[key])

      return match ? `Skiftedag ${match[1]}` : ''
    },
    hasFreeCleaning() {
      return this.listing.meta?.freeEndClean || this.facilities.MandatoryCleaning
    },
    isFresh() {
      return this.listing.startYear >= 2025 || this.listing.daysPublished < 60
    },
    formattedPrice() {
      return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        maximumFractionDigits: 0
      }).format(this.listing.fromPrice || 0)
    },
    formattedFee() {
      return new Intl.NumberFormat('da-DK', {
        style: 'currency',
        currency: 'DKK',
        maximumFractionDigits: 0
      }).format(this.listing.fromFeePrice || 0)
    }
  },
  methods: {
    nextImage() {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.carouselImages.length
      this.imageFailed = false
    },
    previousImage() {
      this.activeImageIndex =
        (this.activeImageIndex - 1 + this.carouselImages.length) %
        this.carouselImages.length
      this.imageFailed = false
    },
    selectImage(index) {
      this.activeImageIndex = index
      this.imageFailed = false
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>
