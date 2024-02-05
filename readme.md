## vue-in-vue

1. cd .\vue-in-vue\app1\
2. npm i
3. npm run dev
4. http://localhost:8801/
5. cd .\vue-in-vue\container\
6. npm i
7. npm run dev
8. http://localhost:8800/

**expected:** `...app1) is not a function`
**expected:** `...TypeError: Cannot read properties of undefined (reading 'call')`

## js-in-js

1. cd .\js-in-js\app1\
2. npm i
3. npm run dev
4. http://localhost:8811/
5. cd .\js-in-js\container\
6. npm i
7. npm run dev
8. http://localhost:8810/

**expected:** TypeError: fn is not a function
