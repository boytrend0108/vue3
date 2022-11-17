// this directive we can use in any other components
export default {
    name: 'intersection',
    // mounted  вызывается перед монтированием родительского компонента, к элементу которого привязана директива.
    mounted(el, binding) {// el it is dom-el when we put  this directive
        // console.log(el, binding);// via binding we can pass obj, fn, etc
        // (000)this for intersection observer------------------
        // console.log(this.$refs.observer)// div за которым мы наблюдаем
        // Create watcher-object

        let options = {
            // root: null, // default
            rootMargin: '0px',
            threshold: 0.25
        }
        const callback = (entries, observer) => {
            // if intersection true and it is't last page  
            if (entries[0].isIntersecting) {
                binding.value();// in is fn from <div v-intersection="loadMorePosts" class="observer">
            }
        }
        let observer = new IntersectionObserver(callback, options);// watcn for whole page

        //
        observer.observe(el);// target el 
    }
}