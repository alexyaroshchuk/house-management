<?php

use Illuminate\Database\Seeder;
use \App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name'     => 'Admin',
                'email'    => 'admin@admin.com',
                'role'     => 'admin',
                'password' => bcrypt('admin')
            ],
            [
                'name'     => 'Manager',
                'email'    => 'manager@manager.com',
                'role'     => 'manager',
                'password' => bcrypt('manager')
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }

    }
}
