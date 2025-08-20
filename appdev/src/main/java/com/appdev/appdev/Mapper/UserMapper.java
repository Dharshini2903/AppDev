// package com.appdev.appdev.Mapper;

// import org.mapstruct.Mapper;
// import org.mapstruct.Mapping;
// import com.appdev.appdev.Model.User;
// import com.appdev.appdev.DTO.UserDTO;

// @Mapper(componentModel = "spring")
// public interface UserMapper {

//     @Mapping(source = "manager.id", target = "managerId")
//     UserDTO toDTO(User user);

//     @Mapping(source = "managerId", target = "manager.id")
//     User toEntity(UserDTO dto);
// }
package com.appdev.appdev.Mapper;

import com.appdev.appdev.DTO.UserDTO;
import com.appdev.appdev.Model.User;
import com.appdev.appdev.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component

public class UserMapper {

    @Autowired
    private  UserRepository userRepository;

    public UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setManagerId(user.getManager() != null ? user.getManager().getId() : null);
        return dto;
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) return null;
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        if (dto.getManagerId() != null) {
            User manager = userRepository.findById(dto.getManagerId()).orElse(null);
            user.setManager(manager);
        } else {
            user.setManager(null);
        }
        return user;
    }
}
