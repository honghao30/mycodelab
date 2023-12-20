<template>
    <div class="command__wrap">
        <Title 
            pageTitle="댓글"
            :level="3" 
        />
        <div class="command__list--wrap">
            <p class="article-list irtext">{{ SelectVideo.title }}</p>
            <ul class="command__list">
                <li v-for="(item, index) in SelectVideo.comments.slice().reverse()" :key="item">
                    <div class="command__item--wrap">
                        <div class="profile__wrap">
                            <img src="images/temp/icon-profile-user.svg" alt="">
                        </div>
                        <div class="command__item--info">
                            <p class="name">{{ item.nickName }}</p>
                            <p class="description"  v-if="!isEditing(index)">{{ item.user_comment }}</p>
                            <div class="command__write" v-else>
                                <textarea v-model="item.user_comment" maxlength="20"></textarea>
                                <MyBtn                            
                                    buttonName="수정"                                                        
                                    iconOnly                                            
                                    iconName="icon-arrow-upload"
                                    @click="ModifySave(SelectVideo, index, item.user_comment)"  
                                >
                                </MyBtn>                                        
                            </div>                                              
                            <p class="info">
                                {{ item.writeTime }} |
                                <MyBtn                            
                                    buttonName="수정" 
                                    v-if="!isEditing(index)"   
                                    @click="ModifyCommand(index)"  
                                >
                                </MyBtn> / 
                                <MyBtn                            
                                    buttonName="삭제"    
                                    v-if="!isEditing(index)"
                                    @click="DellCommand(SelectVideo, index)"  
                                >
                                </MyBtn>
                            </p>
                        </div>
                    </div>                                  
                </li>
            </ul>
            <div class="command__write">
                <div class="profile__wrap">
                    <img src="./images/temp/icon-profile-user.svg" alt="">
                </div>
                <div class="textarea__wrap">
                    <textarea v-model="user_command" maxlength="20"></textarea>
                    <div class="command__button">
                        <MyBtn                            
                            buttonName="댓글등록"    
                            iconOnly                                            
                            iconName="icon-arrow-upload"
                            @click="addCommand(SelectVideo)"  
                        >
                        </MyBtn>                                    
                    </div>                                    
                </div>
            </div>
        </div>                        
    </div>  
</template>

<script setup>
import { defineEmits,defineProps, ref } from 'vue'

const props = defineProps({
  SelectVideo: {
    type: Array,
    default: () => []
  }
})
let editMode = ref([])
const user_command =ref('')
const isEditing = (index) => editMode.value.includes(index)

const addCommand = (SelectVideo) => {
    let new_command = {
        nickName: '@manage',
        writeTime: '2023-12-12 16:44',
        user_comment: user_command.value
    }      
    SelectVideo.comments.push(new_command)
    SelectVideo.statistics.comment_count++
    user_command.value = ''    
}
const ModifyCommand = (index) => {    
    const idx = editMode.value.indexOf(index)
    console.log(index, idx)
    if (idx === -1) {
        editMode.value.push(index)
    } else {
        editMode.value.splice(idx, 1)
    }    
}
const ModifySave = (SelectVideo,index, newComment) => {
    SelectVideo.comments[index].user_comment = newComment
    ModifyCommand(index)    
}
const DellCommand = (SelectVideo, index) => {
    console.log(SelectVideo,index)    
    SelectVideo.comments.splice(index, 1)
    SelectVideo.statistics.comment_count--
}
</script>

<style lang="scss">
    .command__wrap {
        padding: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;  
        .command__item--wrap {
            display: flex;
            gap: 10px;
            .command__write {
                textarea {
                    width: 100%;
                    padding: 10px;
                    height: 50px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                }
            }
            .command__item--info {
                flex: 1;
                .name {
                    font-weight: 500;
                    font-size: 16px;
                }
                .description {
                    font-size: 16px; 
                }
                .info {
                    font-size: 14px;
                }
            }
        }
        .profile__wrap {
            width:36px;
            height:36px;
            border-radius: 50%;
            background: #D9D9D9;
        }              
        .command__list--wrap {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 20px 0;
            .command__write {
                height: 60px;
                display: flex;
                align-items: center;
                gap: 10px;
                .textarea__wrap {
                    background: #D9D9D9;
                    border-radius: 12px;
                    flex: 1;
                    padding:0;
                    display: flex;
                    justify-content: space-between;  
                    align-items: center;                  
                    textarea {
                        flex:1;
                        height: auto;                        
                        padding: 5px;
                    }   
                    .command__button {
                       width: fit-content;
                       padding-right: 10px;
                    }                
                }
            }
            .article-list {
                font-size: 20px;
            }
            .command__list {
                margin-top: 10px;
                border-top: 1px solid #ccc;
                flex:1;
                height: calc(100% - 100px);
                overflow-y: scroll;
                padding: 0 10px;
                li {
                    padding: 15px 0;
                    border-bottom: 1px solid #ccc;
                }
            }
        }
    } 
</style>