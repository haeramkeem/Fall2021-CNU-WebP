# 05 - PHP
#opencse/웹프로그래밍

## Case sensitivity
* if, else while같은 ::키워드들은 대소문자를 구분하지 않고::
* ::변수 이름같은 식별자만 대소문자를 구분한다::
- - - -
## Basic PHP
```
<?php 
    // Comments
    # Comments
    /* Comments */

    $variable = 3 // Loosely typed variable
?>
```
- - - -
## Variable, Constant
### Accessing Global Variables
* [‘global’ keyword](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_var_global_keyword) - without `globals`, you can’t use global variables in local scope
* [$GLOBALS collection](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_var_globals)
### Static
* [‘static’ keyword](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_var_static) : local static variable
### Constant
* [define()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_constant1)
* [constant array](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_constant_array)
- - - -
## Array
* [array()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_datatypes_array)
* [count()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_length)
* [Associative array - map](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_assoc)
* [Multi-dimensional array](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_multi)
### Sort
* [Ascending order](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_sort_alpha)
* [Descending order](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_rsort_alpha)
* [Associative array sort](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_asort)
* [Key sort](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_array_ksort)
- - - -
## Object
* [‘class’ keyword, constructor, new](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_datatypes_object)
- - - -
## String
### Formatting
* [Concatenate](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_oper_string1)
* `“$variable”`
### Utils
* [strlen()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_string_length)
* [str_word_count()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_string_word_count)
* [strrev()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_string_reverse)
* [strpos()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_string_pos)
* [str_replace()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_string_replace)
- - - -
## Number
### Utils
* [is_int()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_numbers_integer)
* [is_float()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_numbers_float)
* [is_numberic()](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_numbers_numeric)
* [int casting](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_numbers_cast)
- - - -
## Operator
* [‘<=>’ - Spaceship](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_oper_spaceship)
* [‘??’ - Null Coalescing](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_oper_null_coalescing)
- - - -
## Loop
* [foreach - as](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_loop_foreach)
* [Iterating array / object](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_loop_foreach2)
- - - -
## Function
* [Default Argument](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_function4)
* [Reference Argument](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_func_pass_ref)
- - - -
## Superglobals
* [$_SERVER](https://tryphp.w3schools.com/showphp.php?filename=demo_global_server)
* [$_REQUEST](https://tryphp.w3schools.com/showphp.php?filename=demo_global_request)
* [$_POST](https://tryphp.w3schools.com/showphp.php?filename=demo_global_post)
* [$_GET](https://tryphp.w3schools.com/showphp.php?filename=demo_global_get)