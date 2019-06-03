// Notice.vue 的动态渲染
import Notice from './Notice.vue';
import Vue from 'vue';

Notice.newInstance = properties => {
    let props = properties || {};
    let Instance = new Vue({
        data: props,
        render: h => <Notice props={props}/>
    })
    let component = Instance.$mount();
    document.body.appendChild(component.$el);
    console.log(Instance)
    const notice = Instance.$children[0];
    return {
        add(noticeProps){
            notice.add(noticeProps);
        },
        remove(name){
            notice.remove(name);
        }
    }
}

export default Notice;