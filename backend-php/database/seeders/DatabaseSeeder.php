<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            ['name'=>'Alice','email'=>'alice@example.com','created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Bob','email'=>'bob@example.com','created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Carol','email'=>'carol@example.com','created_at'=>now(),'updated_at'=>now()],
        ]);

        DB::table('ideas')->insert([
            ['title'=>'Produto A','description'=>'Descrição A','createdBy'=>1,'created_at'=>now(),'updated_at'=>now()]
        ]);
    }
}
