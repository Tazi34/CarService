package pw.react.carly.admin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;



@Service
public class AdminService implements UserDetailsService {

    private AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

//    public Admin updateAdmin(Admin admin){
//        if(adminRepository.existsById(admin.getId())) {
//            adminRepository.save(admin);
//            return adminRepository.save(admin);
//        }
//
//        throw new ResourceNotFoundException("Admin not found");
//    }
//
    public AdminDTO deleteAdmin(Long id){
        if(adminRepository.existsById(id)) {
            Admin admin = adminRepository.findById(id).get();
            adminRepository.delete(admin);
            return new AdminDTO(admin.getEmail(),admin.getId());
        }
        throw new ResourceNotFoundException("Admin not found");
    }

    public AdminDTO getAdmin(Long id){
        if(adminRepository.existsById(id)) {
            Admin admin = adminRepository.findById(id).get();
            return new AdminDTO(admin.getEmail(),admin.getId());
        }
        throw new ResourceNotFoundException("Admin not found");
    }
    public List<AdminDTO> findByEmail(String email){
        List<AdminDTO> admins = adminRepository.findAdminByEmail(email).stream().map((admin) -> new AdminDTO(admin.getEmail(),admin.getId())).collect(Collectors.toList());
        return admins;
    }

    public List<AdminDTO>  getAllAdmins(){
        return adminRepository.findAll().stream().map((admin) -> new AdminDTO(admin.getEmail(),admin.getId())).collect(Collectors.toList());
    }
    //for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       List<Admin> admins = adminRepository.findAdminByEmail(email);
        if (admins.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        Admin admin = admins.get(0);
        return new User(admin.getEmail(), admin.getPassword(),emptyList());
    }
}
