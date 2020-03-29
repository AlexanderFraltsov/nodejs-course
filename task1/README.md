# my_caesar_cli

##### 1. Clone the repository
    git clone https://github.com/AlexanderFraltsov/nodejs-course.git
##### 2. Checkout on the task branch
    git checkout task1
##### 3. Install node_modules
    npm install
##### 4. Go to the task directory
    cd task1
##### 5 Start
    node my_caesar_cli <arguments>

arguments:  
| Short alias | Full name | Description | Type | isRequired |  
|-|-|-|-|-|
| -a | --action | an action encode/decode | `string: 'encode' or 'decode'` | true |  
| -s | --shift | a shift | `number` | true |  
| -i | --input | an input file path | `string` | false |  
| -o | --output | an output file path | `string` | false | 
