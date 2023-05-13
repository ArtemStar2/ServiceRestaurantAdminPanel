import { useEffect, useContext } from 'react'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
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
import MenuList from './pages/client/menu'
import MenuItem from './pages/client/menuItem'

const App = () => {
    const {store} = useContext(Context)
    useEffect(() => {
        if(localStorage.getItem('token')){
            store.chechAuth()
        }
    }, [])

    return (
        <>
        <Layout>
            <Routes>
                <Route path="/menu" element={<MenuList />}/>
                <Route path="/menu/:id" element={<MenuItem />}/>

                <Route path="/admin" element={!store.isAuth ? <LoginForm /> :<div>Панель</div>}/>
                <Route path="/admin/users" element={!store.isAuth ? <LoginForm /> : <Users />}/>
                <Route path="/admin/product" element={!store.isAuth ? <LoginForm /> : <Products />}/>
                <Route path="/admin/product/create" element={!store.isAuth ? <LoginForm /> : <ProductsCreate />}/>
                <Route path="/admin/product/:id" element={!store.isAuth ? <LoginForm /> : <ProductsUpdate />}/>
                <Route path="/admin/events/create" element={!store.isAuth ? <LoginForm /> : <EventCreate />}/>
                <Route path="/admin/events/" element={!store.isAuth ? <LoginForm /> : <Event />}/>
                <Route path="/admin/events/:id" element={!store.isAuth ? <LoginForm /> : <EventUpdate />}/>
                <Route path="/admin/tables/" element={!store.isAuth ? <LoginForm /> : <Tables />}/>
                <Route path="/admin/tables/create" element={!store.isAuth ? <LoginForm /> : <TableCreate />}/>  
                <Route path="/admin/tables/:id" element={!store.isAuth ? <LoginForm /> : <TableUpdate />}/>
                <Route path="/admin/contact/" element={!store.isAuth ? <LoginForm /> : <Contact />}/>
                <Route path="/admin/orders/create" element={!store.isAuth ? <LoginForm /> : <OrderCreate />}/>
                <Route path="/admin/orders/" element={!store.isAuth ? <LoginForm /> : <Order />}/>
                <Route path="/admin/orders/:id" element={!store.isAuth ? <LoginForm /> : <EventUpdate />}/>
                <Route path="*" element={<div>Error</div>}/>
            </Routes>
        </Layout> 
        <Toaster />
        </>
    )
}

export default observer(App);
