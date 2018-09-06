import React from 'react'
import { render } from 'react-dom'
import TheRoot from './components/TheRoot';
import { hot } from 'react-hot-loader'
import dva, { connect, Router } from "dva"
import models from "./models/index"
import mapValues from 'lodash/mapValues'


const TheHotRoot = hot(module)(connect(props => props)(TheRoot))

const app = dva()

mapValues(models, model => app.model(model))


app.router(() => <TheHotRoot />)

app.start("#app")