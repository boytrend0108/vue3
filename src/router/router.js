import Main from "@/pages/Main"
import PostPage from '@/pages/PostPage'
import AboutPage from '@/pages/AboutPage'
import PostPageId from '@/pages/PostPageId'
import PostPageWithStore from '@/pages/PostPageWithStore'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { // don't forget to import
        path: '/', // on this addres open...
        component: Main // this page...
    },
    {// don't forget to import
        path: '/posts',// on this addres open...
        component: PostPage// this page...
    },
    {// don't forget to import
        path: '/about',// on this addres open...
        component: AboutPage// this page...
    },
    {// don't forget to import
        path: '/posts/:id',// on this addres open...
        component: PostPageId// this page...
    },
    {// don't forget to import
        path: '/store',// on this addres open...
        component: PostPageWithStore// this page...
    },
    {// don't forget to import
        path: '/composition',// on this addres open...
        component: PostPageCompositionApi// this page...
    },
]

const router = createRouter(
    {
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)

export default router;