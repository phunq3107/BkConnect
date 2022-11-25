package com.bk.bkconnect;

import com.bk.bkconnect.database.driver.MessageDAO;
import com.bk.bkconnect.database.driver.StudentDAO;
import com.bk.bkconnect.database.driver.UserDAO;
import com.bk.bkconnect.database.entity.MessageEnt;
import com.bk.bkconnect.database.entity.StudentEnt;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InitRunner implements CommandLineRunner {

    StudentDAO studentDAO;
    UserDAO userDAO;
    MessageDAO messageDAO;

    @Override
    public void run(String... args) throws Exception {
        var student = new StudentEnt();
        var message = new MessageEnt();
        message.user = student;
        var user = userDAO.saveAndFlush(new StudentEnt());
        System.out.println(user.id);
        System.out.println(studentDAO.findById(user.id));
        message.user = user;
        userDAO.saveAndFlush(user);
        messageDAO.saveAndFlush(message);
    }
}
