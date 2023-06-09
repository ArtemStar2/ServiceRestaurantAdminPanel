import { useEffect, useContext } from 'react'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Users from './pages/users'
import Products from './pages/products'
import ProductsCreate from './pages/productsCreate'
import ProductsUpdate from './pages/productsUpdate'
import Event from './pages/event'
import EventCreate from './pages/eventCreate'
import EventUpdate from './pages/eventUpdate'
import Tables from './pages/table'
import TableCreate from './pages/tableCreate'
import TableUpdate from './pages/tableUpdate'
import Contact from './pages/contact'
import Order from './pages/order'
import OrderCreate from './pages/orderCreate'
import LoginForm from './components/loginForm'
import Loading from './components/loading'
import MenuList from './client/product'
import ProductOneClient from './client/product/component/itemPage'
import OrderClient from './client/product/OrderClient'
import { toJS } from 'mobx'
import EventList from './client/event'
import EventItemOne from './client/event/item'
import TableIndex from './client/table'

declare const window: any;

const tg = window?.Telegram?.WebApp;

const App = () => {
    const {store} = useContext(Context)
    useEffect(() => {
        if(tg?.initDataUnsafe?.user?.id){
            const userid = tg.initDataUnsafe.user.id;
            store.auth(userid, '')
        }
        if(localStorage.getItem('token')){
            store.chechAuth()
        }
    }, [])
    return (
        <>
        <Layout>
            <Routes>
                <Route path="/menu" element={<MenuList />}/>
                <Route path="/menu/:id" element={<ProductOneClient />}/>
                <Route path="/menu/category/:code" element={<MenuList />}/>
                <Route path="/order" element={<OrderClient />}/>
                <Route path="/event" element={<EventList />}/>
                <Route path="/event/:id" element={<EventItemOne />}/>
                <Route path="/table" element={<TableIndex />}/>
                <Route path="/table/:id" element={<TableIndex />}/>
                <Route path="/admin" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin" ? <LoginForm /> :<div>Панель</div>}/>
                <Route path="/admin/users" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Users />}/>
                <Route path="/admin/product" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Products />}/>
                <Route path="/admin/product/create" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <ProductsCreate />}/>
                <Route path="/admin/product/:id" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <ProductsUpdate />}/>
                <Route path="/admin/events/create" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <EventCreate />}/>
                <Route path="/admin/events/" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Event />}/>
                <Route path="/admin/events/:id" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <EventUpdate />}/>
                <Route path="/admin/tables/" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Tables />}/>
                <Route path="/admin/tables/create" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <TableCreate />}/>  
                <Route path="/admin/tables/:id" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <TableUpdate />}/>
                <Route path="/admin/contact/" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Contact />}/>
                <Route path="/admin/orders/create" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <OrderCreate />}/>
                <Route path="/admin/orders/" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <Order />}/>
                <Route path="/admin/orders/:id" element={store.isLoading ?  <Loading /> : !store.isAuth || toJS(store.user.role) != "admin"  ? <LoginForm /> : <EventUpdate />}/>
                <Route path="*" element={<div>Error</div>}/>
            </Routes>
        </Layout> 
        <Toaster />
        </>
    )
}

export default observer(App);
