<template>
    <div class="video-upload">
        <Title 
            pageTitle="검색"
            :level="3" 
        />
        <div class="video-upload-form search__wrap">
            <MyInput >
                <template #input>
                    <InputEl                                        
                        v-model.trim="searchText"                                                 
                        placeholder="검색어를 입력하세요"
                        @keyup.enter="fileteredVideos"                                        
                    />                
                    <MyBtn                            
                        buttonName="검색"
                        iconOnly="true"
                        iconName="btn-search-icon"     
                        :disabled="!searchText"
                        @click="fileteredVideos"                                                                      
                    >  
                    </MyBtn>
                </template>    
                <template #autoComplete>
                    <div class="autocomplete">
                        <ul class="autocomplete__list">
                            <li v-for="video in SearchResults" :key="video">
                                <MyBtn                            
                                    :buttonName="video.title"                                                                                                        
                                    >
                                </MyBtn>              
                            </li>
                        </ul>
                    </div>
                </template>           
            </MyInput>                        
        </div>
        <div class="search-results">
            <div class="hot-keyword__wrap"><strong>최근검색어</strong> : <span v-for="word in KeyWordList" :key="word">{{ word }} </span></div>
            <strong>{{ SearchResults.length }}</strong> 건의 비디오가 검색 되었습니다.
            <div class="search-results__wrap">
                <ul>
                    <li v-for="(video, index) in SearchResults" :key="index">
                        <div>
                            <div class="small-video">
                                <video 
                                :id="'v-' + video.id"
                                x5-video-player-fullscreen="true"
                                webkit-playsinline="true"
                                x-webkit-airplay="true"
                                playsinline="true"
                                x5-playsinline
                                :src="video.url"
                                muted                                                                                                                                 
                            ></video>                                            
                            </div>
                            <p class="tit">{{ video.title }}</p>
                            <p class="info">{{ video.nickName }} | {{ video.statistics.like_count }}</p>                                    
                        </div>                                 
                    </li>
                </ul>    
            </div>          
        </div>
    </div>  
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick, defineProps } from 'vue'

const searchText = ref('')
const searchInput = ref(null)
const SearchResults = ref([])
const KeyWordList = ref([])

const props = defineProps({
 videoList: {
    type: Object,
    default: () => ({})
  }
})
const regExp = /\s/g;
const autoComplete = ref(false)

const fileteredVideos = () => { 
    if(searchText.value === '') {
        console.log('검색어가 없습니다.', searchText.value)
        return
    }  else {
        const filteredVideos = props.videoList.filter(video => {
            return video.title.includes(searchText.value);
        });         
        SearchResults.value = filteredVideos     
        KeyWordList.value.push(searchText.value);               
    }
}

const fillterVideoList = ref(props.videoList)

watch(searchText, () => {
    if(searchText.value !== '') {
        fileteredVideos();
    }
})
</script>

<style lang="scss">
.search-results__wrap {
    overflow-y: auto;
    max-height: 100%;
}
.search-results {
    padding: 10px 0;
    height: 500px;
    ul {
        margin-top: 20px;
        border-top: 1px solid #ccc;
        padding-top: 5px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 10px;
        li {
                width: calc((100%/2) - 20px);
                padding: 15px 0;
                // border-bottom: 1px solid #ccc;
                .small-video {
                    width: 70%;
                }
                .nodata {
                    text-anchor: center;
                }
            }  
    }
}
.search__wrap {
    .input__wrap {
        position: relative;
        .input {
            width: 100%;

        }
    }
}
.nodata {
    padding: 50px;
    text-align: center;    
}
.btn-btn-search-icon {
    width: 45px;
    height: 45px;
    background-image: url('@/assets/images/icon/btn-search-icon.svg');
    background-position: 50%;
    background-size: 45px auto;
    &[disabled] {
        opacity: 0.5;
        pointer-events: none; 
    }
}
.btn-close-circle {
    position: absolute;
    right: 63px;
    top: 14px;
    width: 15px;
    height: 15px;
    background-image: url('@/assets/images/icon/icon-close-sm-clear.svg');
    background-position: 50%;
    background-size: 45px auto;    
}
.hot-keyword__wrap {
    span {
        &::after {
            content: ',';
        }
        &:only-child {
            display: block;
        }
        &+span {
            margin-left: 5px;
        }
        &:last-child {
            &::after {
                content: '';
            }
        }
    }
}
.autocomplete {
    position: absolute;
    width: calc(100% - 47px);
    padding: 10px;
    left:0;
    top:45px;
    background: #fff;
    border: 1px solid #ddd;
    border-top: 0;
    li {
        button {
            padding: 5px 0;
        }
    }
}
</style>